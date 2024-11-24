# create-ts-npm-lib

[![NPM version](https://img.shields.io/npm/v/create-ts-npm-lib.svg)](https://www.npmjs.com/package/create-ts-npm-lib)
[![GitHub](https://img.shields.io/github/license/little-thing/create-ts-npm-lib)](https://github.com/little-thing/create-ts-npm-lib/blob/main/LICENSE)

CLI tool for creating TypeScript NPM library projects.

[中文文档](./README.zh-CN.md)

## Usage

```bash
# Using npx (recommended)
npx create-ts-npm-lib
# Or
npx create ts-npm-lib

# Or install globally
npm install -g create-ts-npm-lib
create-ts-npm-lib

# Using pnpm
pnpm dlx create-ts-npm-lib

# Using yarn
yarn create ts-npm-lib
```

After running the command, follow the prompts to:
1. Enter your project name
2. Provide a description
3. Set author information
4. Choose version number
5. Select license type

The tool will then:
1. Create a new directory with your project name
2. Set up a TypeScript NPM library project structure
3. Configure all necessary build tools and testing framework
4. Initialize Git repository

## Features

- 📦 TypeScript support
- 🛠️ Out-of-the-box build configuration
- 📝 Automatically generate project documentation
- ✅ Integrated test environment

## License

MIT