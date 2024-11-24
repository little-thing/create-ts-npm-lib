import { defineConfig } from 'tsup'
import fs from 'fs-extra'
import path from 'path'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  clean: true,
  dts: true,
  shims: true,
  async onSuccess() {
    // 构建完成后复制模板文件到 dist 目录
    const templateDir = path.join(process.cwd(), 'template')
    const distTemplateDir = path.join(process.cwd(), 'dist/template')

    await fs.copy(templateDir, distTemplateDir, {
      filter: (src) => {
        return !src.includes('node_modules') &&
               !src.includes('dist') &&
               !src.includes('.git')
      }
    })

    console.log('Template files copied successfully!')
  }
})
