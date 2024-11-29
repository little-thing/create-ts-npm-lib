#!/usr/bin/env node

import { messages } from './locales'

console.log(messages.cliStarting)

import enquirer from "enquirer";
const { prompt } = enquirer;
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { simpleGit, SimpleGit } from 'simple-git'

const TEMPLATE_REPO = 'https://github.com/little-thing/create-ts-npm-lib.git'
const TEMPLATE_BRANCH = 'main'

async function downloadTemplate(targetDir: string) {
  const git: SimpleGit = simpleGit()
  const tempDir = path.join(targetDir, '.temp')
  
  try {
    // 创建临时目录
    await fs.ensureDir(tempDir)
    
    // 克隆仓库
    console.log(chalk.cyan(messages.downloading))
    await git.clone(TEMPLATE_REPO, tempDir, ['--depth', '1', '--branch', TEMPLATE_BRANCH])
    
    // 移动 template 目录内容到目标目录
    const templateDir = path.join(tempDir, 'template')
    await fs.copy(templateDir, targetDir, {
      filter: (src) => {
        return !src.includes('node_modules') &&
               !src.includes('dist') &&
               !src.includes('.git')
      }
    })
    
    // 清理临时目录
    await fs.remove(tempDir)
  } catch (error) {
    // 确保清理临时目录
    await fs.remove(tempDir)
    throw error
  }
}

async function init() {
  try {
    const answers = await prompt<{
      projectName: string
      description: string
      author: string
      version: string
      license: string
    }>([
      {
        type: 'input',
        name: 'projectName',
        message: messages.prompts.projectName.message,
        validate: (value) => {
          if (!value) return messages.prompts.projectName.errors.empty
          if (!/^[a-z0-9-]+$/.test(value)) return messages.prompts.projectName.errors.invalid
          return true
        }
      },
      {
        type: 'input',
        name: 'description',
        message: messages.prompts.description.message,
        initial: messages.prompts.description.initial
      },
      {
        type: 'input',
        name: 'author',
        message: messages.prompts.author.message,
        initial: ''
      },
      {
        type: 'input',
        name: 'version',
        message: messages.prompts.version.message,
        initial: '0.0.1'
      },
      {
        type: 'input',
        name: 'license',
        message: messages.prompts.license.message,
        initial: 'MIT'
      }
    ])

    const targetDir = path.join(process.cwd(), answers.projectName)
    console.log(messages.targetDirectory, targetDir)

    // 确保目标目录不存在
    if (await fs.pathExists(targetDir)) {
      throw new Error(`${answers.projectName} ${messages.errors.dirExists}`)
    }

    // 创建目标目录
    await fs.ensureDir(targetDir)

    // 下载模板
    await downloadTemplate(targetDir)

    // 更新 package.json
    const pkgPath = path.join(targetDir, 'package.json')
    if (!await fs.pathExists(pkgPath)) {
      throw new Error(messages.errors.templateDownloadFailed)
    }

    const pkg = await fs.readJson(pkgPath)
    const newPkg = {
      ...pkg,
      name: answers.projectName,
      description: answers.description,
      author: answers.author,
      version: answers.version,
      license: answers.license
    }

    await fs.writeJson(pkgPath, newPkg, { spaces: 2 })

    console.log(chalk.green(messages.projectCreated))
    console.log(chalk.cyan(messages.nextSteps))
    console.log(chalk.white(`cd ${answers.projectName}`))
    console.log(chalk.white('pnpm install'))
    console.log(chalk.white('pnpm dev\n'))

  } catch (error) {
    console.error(chalk.red(messages.error), error)
    process.exit(1)
  }
}

init()
