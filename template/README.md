# TypeScript NPM Package Template

A template project for quickly creating TypeScript NPM packages.

[中文文档](./README.zh-CN.md)

## Features

- 📦 TypeScript Support
- 🔨 Build with tsup
- 🧪 Jest Testing Framework
- 📝 ESLint + Prettier Code Standards
- 📋 Complete TypeScript Type Declarations
- 🚀 GitHub Actions CI/CD

## GitHub Actions Configuration

### Setting up NPM_TOKEN

To publish packages via GitHub Actions, you need to add your NPM token as a repository secret:

1. Generate an NPM access token:
   - Go to [npmjs.com](https://www.npmjs.com/) and sign in
   - Click your profile picture > Access Tokens
   - Click "Generate New Token" > "Classic Token"
   - Select type: "Automation" (for CI/CD)
   - Set appropriate permissions (read and publish)

For detailed instructions about NPM tokens, see [About access tokens](https://docs.npmjs.com/about-access-tokens).

2. Add the token to your repository secrets:
   - Go to your repository's Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your NPM access token

For more information about using secrets in GitHub Actions, see [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).

## Getting Started

1. Install dependencies

```bash
pnpm install
```
