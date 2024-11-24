#!/usr/bin/env node

console.log('CLI 开始执行...')

import enquirer from "enquirer";
const { prompt } = enquirer;
import fs from 'fs-extra'
import path from 'path'
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const templateDir = path.join(__dirname, './template')

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
        message: '请输入项目名称:',
        validate: (value) => {
          if (!value) return '项目名称不能为空'
          if (!/^[a-z0-9-]+$/.test(value)) return '项目名称只能包含小写字母、数字和连字符'
          return true
        }
      },
      {
        type: 'input',
        name: 'description',
        message: '请输入项目描述:',
        initial: '一个 TypeScript NPM 包'
      },
      {
        type: 'input',
        name: 'author',
        message: '请输入作者名称:',
        initial: ''
      },
      {
        type: 'input',
        name: 'version',
        message: '请输入初始版本号:',
        initial: '0.0.1'
      },
      {
        type: 'input',
        name: 'license',
        message: '请输入许可证类型:',
        initial: 'MIT'
      }
    ])

    const targetDir = path.join(process.cwd(), answers.projectName)

    // 复制模板文件
    await fs.copy(templateDir, targetDir, {
      filter: (src) => {
        return !src.includes('node_modules') && 
               !src.includes('dist') && 
               !src.includes('.git') &&
               !src.includes('cli')
      }
    })

    // 更新 package.json
    const pkgPath = path.join(targetDir, 'package.json')
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

    console.log(chalk.green('\n✨ 项目创建成功！\n'))
    console.log(chalk.cyan('接下来你可以：\n'))
    console.log(chalk.white(`cd ${answers.projectName}`))
    console.log(chalk.white('pnpm install'))
    console.log(chalk.white('pnpm dev\n'))

  } catch (error) {
    console.error(chalk.red('错误：'), error)
    process.exit(1)
  }
}

init() 