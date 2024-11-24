# TypeScript NPM 包模板

一个用于快速创建 TypeScript NPM 包的模板项目。

[English](./README.md)

## 特性

- 📦 TypeScript 支持
- 🔨 使用 tsup 进行构建
- 🧪 Jest 测试框架
- 📝 ESLint + Prettier 代码规范
- 📋 完整的 TypeScript 类型声明
- 🚀 GitHub Actions CI/CD

## GitHub Actions 配置

### 设置 NPM_TOKEN

要通过 GitHub Actions 发布包，你需要将 NPM token 添加为仓库密钥：

1. 生成 NPM 访问令牌：
   - 登录 [npmjs.com](https://www.npmjs.com/)
   - 点击头像 > Access Tokens
   - 点击 "Generate New Token" > "Classic Token"
   - 选择类型："Automation"（用于 CI/CD）
   - 设置适当的权限（读取和发布）

关于 NPM 令牌的详细说明，请参见 [关于访问令牌](https://docs.npmjs.com/about-access-tokens)。

2. 将令牌添加到仓库密钥：
   - 进入仓库的 Settings > Secrets and variables > Actions
   - 点击 "New repository secret"
   - 名称：`NPM_TOKEN`
   - 值：你的 NPM 访问令牌

关于在 GitHub Actions 中使用密钥的更多信息，请参见 [在 GitHub Actions 中使用密钥](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)。


## 开始使用

1. 安装依赖

```bash
pnpm install
```
