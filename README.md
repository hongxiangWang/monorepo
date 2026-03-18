# 开发指南

本项目基于 **pnpm + monorepo** 架构管理，本文档描述开发流程和代码规范约束。

## 📦 技术栈

| 类别       | 工具                             | 说明                                          |
| ---------- | -------------------------------- | --------------------------------------------- |
| 包管理     | pnpm                             | 原生支持 monorepo，硬链接节省空间             |
| 任务编排   | Turborepo                        | 缓存构建，并行执行，自动依赖排序              |
| 语言       | TypeScript                       | 全栈类型安全                                  |
| 代码检查   | ESLint                           | 静态代码分析                                  |
| 代码格式化 | Prettier                         | 统一代码风格                                  |
| 拼写检查   | cspell                           | 检查英文拼写错误                              |
| 单元测试   | Vitest                           | 快速单元测试框架                              |
| 提交规范   | commitlint + commitizen + cz-git | 交互式生成符合约定式提交规范的 commit message |
| Git Hooks  | husky + lint-staged              | 提交前自动检查                                |
| CI/CD      | GitHub Actions                   | 持续集成                                      |

## 📁 目录结构

```
mono/
├── apps/                # 应用项目
│   └── web/            # Web 前端应用 (React + Vite + Tailwind CSS)
├── packages/           # 共享包
│   ├── utils/          # 通用工具函数
│   ├── ui/             # 共享 React UI 组件
│   ├── types/          # 共享 TypeScript 类型定义
│   └── config/         # 共享 ESLint / TypeScript 配置
├── .husky/             # git hooks 配置 (自动生成)
├── commitlint.config.js
├── commitizen.config.cjs
├── cspell.json
├── .lintstagedrc.json
├── turbo.json
└── pnpm-workspace.yaml
```

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm 9+

### 安装依赖

```bash
pnpm install
```

### 初始化 Git Hooks

```bash
pnpm prepare
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
npx husky add .husky/pre-commit 'npx lint-staged'
```

### 启动开发

```bash
# 启动所有包的开发模式
pnpm dev

# 只启动 web 应用
pnpm --filter web dev
```

### 构建所有包

```bash
pnpm build
```

## 📝 开发规范

### 1. 代码风格

- 遵循项目配置的 ESLint 和 Prettier
- 提交前会自动格式化，不用手动调整
- 编辑器建议安装 ESLint 和 Prettier 插件

### 2. 类型约束

- 所有代码必须使用 TypeScript
- 禁止使用 `any`，尽可能推导类型，必要时才声明类型
- `@ts-ignore` 和 `// @ts-expect-error` 必须有注释说明原因

### 3. 拼写检查

- 项目集成了 cspell 检查英文拼写
- 如果遇到技术专有词汇被误报，可以在 `cspell.json` 的 `words` 数组添加该单词
- 或者在代码中使用 `// cspell:ignore word` 忽略

### 4. 包间依赖

- 使用 `workspace:*` 协议引用工作区内的包：
  ```json
  {
    "dependencies": {
      "@repo/utils": "workspace:*"
    }
  }
  ```
- 避免循环依赖
- 共享包尽量保持单一职责

### 5. 提交规范

**必须使用交互式工具生成 commit message：**

```bash
git add .
pnpm commit
```

按照提示一步步选择：

1. **type** - 提交类型
   - `feat` - 新增功能
   - `fix` - 修复 bug
   - `docs` - 文档更新
   - `style` - 代码格式调整
   - `refactor` - 重构
   - `perf` - 性能优化
   - `test` - 测试相关
   - `chore` - 构建/工具相关
   - `build` - 构建系统变更
   - `ci` - CI/CD 相关
   - `revert` - 回滚提交

2. **scope** - 修改范围（web/utils/ui 等）
3. **subject** - 简短描述（50 字以内）
4. **body** - 详细描述（可选）
5. **breaking changes** - 破坏性变更（可选）
6. **closed issues** - 关闭 issue（可选）

最终格式：

```
type(scope): description
```

示例：

```
feat(web): 添加 Tailwind CSS 美化界面
fix(ui): 修复 Button 组件点击样式问题
```

**禁止**直接使用 `git commit` 提交，必须通过 `pnpm commit` 创建。

## 🔍 提交前检查

Git commit 会自动触发以下检查，全部通过才能提交：

1. **pre-commit**
   - 对暂存文件运行 ESLint 并自动修复
   - 对暂存文件运行 Prettier 自动格式化
   - 如果有错误，提交会被终止，修复后重新提交

2. \*\*commit-msg
   - 检查 commit message 是否符合格式要求
   - 格式不对，提交会被终止

## 🎯 常用命令

| 命令                                 | 说明                             |
| ------------------------------------ | -------------------------------- |
| `pnpm install`                       | 安装所有依赖                     |
| `pnpm build`                         | 构建所有包（按依赖顺序）         |
| `pnpm dev`                           | 启动所有包开发模式               |
| `pnpm dev --filter &lt;package&gt;`  | 只启动指定包开发                 |
| `pnpm lint`                          | 对所有包运行 ESLint              |
| `pnpm type-check`                    | 对所有包运行 TypeScript 类型检查 |
| `pnpm spell-check`                   | 运行拼写检查                     |
| `pnpm format`                        | 格式化所有文件                   |
| `pnpm commit`                        | 交互式创建 commit                |
| `pnpm test`                          | 运行所有单元测试                 |
| `pnpm test --filter &lt;package&gt;` | 只运行指定包的测试               |
| `pnpm clean`                         | 清理所有构建产物                 |

## 🧪 单元测试

使用 [Vitest](https://vitest.dev/) 作为单元测试框架：

- 测试文件命名：`*.test.ts` 或 `*.test.tsx`
- 放在和源码同一目录下
- 全局可用 `describe` `it` `expect` 不需要导入

运行测试：

```bash
# 运行所有测试
pnpm test

# 只运行指定包测试
pnpm test --filter utils

# 开发模式监听文件变化
pnpm --filter utils vitest dev
```

## 🔄 CI/CD

### GitHub Actions

项目配置了 GitHub Actions CI，在 `.github/workflows/ci.yml`，每次 `git push` 或打开 Pull Request 都会自动运行：

| 步骤                   | 检查内容            |
| ---------------------- | ------------------- |
| 1. `pnpm lint`         | ESLint 代码检查     |
| 2. `pnpm type-check`   | TypeScript 类型检查 |
| 3. `pnpm spell-check`  | 拼写检查            |
| 4. `pnpm format:check` | 代码格式检查        |
| 5. `pnpm test`         | 运行单元测试        |
| 6. `pnpm build`        | 构建所有包          |

**只有全部检查通过，才能合并代码。**

### 缓存优化

CI 中集成了 Turborepo 远程缓存（基于 GitHub Actions Cache），未修改的包会直接使用缓存，大大加快 CI 运行速度。

### 完整工作流

```
本地开发：
  修改代码 → git add → pnpm commit → git push

  ↓

  本地 husky 自动检查：
  - pre-commit: lint-staged → eslint --fix + prettier --write
  - commit-msg: commitlint 检查提交格式

  ↓

  GitHub Actions 自动运行：
  - 依赖安装（pnpm cache）
  - 代码检查、类型检查、拼写检查、格式检查
  - 运行测试
  - 构建所有包（Turborepo cache）

  ↓

  全部通过 → 可以合并 PR
```

## 🏗️ 添加新包

### 添加新应用

```bash
mkdir -p apps/your-app
# 创建 package.json，添加依赖
# 正常开发即可，pnpm 会自动识别
```

### 添加新共享包

```bash
mkdir -p packages/your-package
# 创建 package.json
# 正常开发即可
```

在其他包中使用：

```json
{
  "dependencies": {
    "@repo/your-package": "workspace:*"
  }
}
```

## 📦 发布与版本管理

项目使用 [Changesets](https://github.com/changesets/changesets) 进行版本管理和发布流程控制。

### Changesets 简介

Changesets 是一个强大的版本管理工具，可以：

- 追踪代码变更
- 自动更新版本号
- 自动生成 CHANGELOG
- 支持多包发布
- 支持自动化发布流程

### 工作流程

```
开发代码 → 创建变更集 → 更新版本号 → 发布到 npm
```

### 使用步骤

#### 1. 创建变更集

开发完成后，运行：

```bash
pnpm changeset
```

系统会提示你：

1. **选择需要发布的包** - 使用空格选择，回车确认
2. **选择版本类型**：
   - `major` - 破坏性变更（1.0.0 → 2.0.0）
   - `minor` - 新功能，向后兼容（1.0.0 → 1.1.0）
   - `patch` - Bug 修复（1.0.0 → 1.0.1）
3. **填写变更描述** - 简短描述本次变更

这会在 `.changeset/` 目录下生成一个 markdown 文件，记录本次变更。

#### 2. 更新版本号

```bash
pnpm version-packages
```

这个命令会：

- 根据 changeset 文件更新相关包的版本号
- 自动更新包内部的依赖版本
- 生成或更新 CHANGELOG.md
- 删除已处理的 changeset 文件

#### 3. 发布到 npm

```bash
pnpm release
```

这个命令会：

- 构建所有包（`turbo build`）
- 发布所有更新的包到 npm（`changeset publish`）

或者手动分步执行：

```bash
pnpm build
pnpm changeset publish
```

### 版本控制策略

遵循语义化版本规范（Semantic Versioning）：

| 版本类型  | 示例          | 适用场景                 |
| --------- | ------------- | ------------------------ |
| **major** | 1.0.0 → 2.0.0 | 破坏性变更，不兼容旧版本 |
| **minor** | 1.0.0 → 1.1.0 | 新增功能，向后兼容       |
| **patch** | 1.0.0 → 1.0.1 | Bug 修复，向后兼容       |

### 配置说明

Changesets 配置文件位于 `.changeset/config.json`：

```json
{
  "baseBranch": "main", // 基准分支
  "access": "restricted", // 发布类型：restricted(私有) 或 public(公开)
  "updateInternalDependencies": "patch", // 内部依赖更新策略
  "ignore": [] // 忽略发布的包
}
```

**重要配置项：**

- `access` - 如果要发布公开包，改为 `"public"`
- `ignore` - 可以添加不需要发布的包，如 `["web"]`

### 发布到 npm 的准备

#### 1. 注册 npm 账号

在 [npmjs.com](https://www.npmjs.com/) 注册账号

#### 2. 登录 npm

```bash
pnpm login
```

#### 3. 配置包名

确保包名在 npm 上是唯一的：

```json
{
  "name": "@your-org/package-name",
  "version": "1.0.0",
  "publishConfig": {
    "access": "public" // 如果是公开包
  }
}
```

### 自动化发布（可选）

可以创建 GitHub Actions 自动化发布流程：

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 9

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'

      - run: pnpm install

      - run: pnpm build

      - run: pnpm changeset publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**设置 NPM_TOKEN：**

1. 在 npm 上创建 Access Token（Automation 类型）
2. 在 GitHub 仓库的 Settings → Secrets → Actions 中添加 `NPM_TOKEN`

### 常用命令

| 命令                    | 说明                    |
| ----------------------- | ----------------------- |
| `pnpm changeset`        | 创建变更集              |
| `pnpm version-packages` | 更新版本号和 CHANGELOG  |
| `pnpm release`          | 构建并发布到 npm        |
| `pnpm changeset status` | 查看当前变更状态        |
| `pnpm changeset add`    | 添加变更集（同 create） |

### 最佳实践

1. **每次功能开发完成后立即创建 changeset**
   - 不要等到发布前才创建
   - 描述要清晰，会出现在 CHANGELOG 中

2. **一个 PR 对应一个 changeset**
   - 保持变更集的原子性
   - 便于追踪和回滚

3. **发布前检查**
   - 运行所有测试：`pnpm test`
   - 检查类型：`pnpm type-check`
   - 本地构建：`pnpm build`

4. **CHANGELOG 管理**
   - Changesets 会自动生成 CHANGELOG
   - 可以手动编辑 `.changeset/*.md` 文件优化描述

### 示例流程

```bash
# 1. 开发新功能
# ... 修改代码 ...

# 2. 创建变更集
pnpm changeset
# 选择: @repo/utils
# 选择: minor (新功能)
# 描述: 添加 debounce 函数

# 3. 提交代码
git add .
pnpm commit
git push

# 4. 更新版本号（可以在发布前统一更新）
pnpm version-packages
# 这会更新 packages/utils/package.json 的版本号
# 并生成 packages/utils/CHANGELOG.md

# 5. 发布到 npm
pnpm release
# 或者分步执行：
# pnpm build
# pnpm changeset publish

# 6. 推送 git tags
git push --follow-tags
```

### 注意事项

- ⚠️ 发布是**不可逆**的操作，发布后无法撤销
- ⚠️ 确保包名在 npm 上未被占用
- ⚠️ 私有包需要 npm 付费账号
- ⚠️ 发布前确保所有测试通过
- ⚠️ 不要在 changeset 文件中包含敏感信息

## ❓ FAQ

### Q: 为什么 pnpm 而不是 yarn/npm workspaces？

A: pnpm 更快，更节省磁盘空间，原生支持 monorepo。

### Q: 为什么 Turborepo 而不是 Nx？

A: Turborepo 更轻量，配置简单，适合中小型项目。

### Q: 可以同时开发多个应用吗？

A: 可以，运行 `pnpm dev`，Turborepo 会同时启动所有有 `dev` 脚本的包。

### Q: 构建很慢？

A: Turborepo 有缓存，第二次构建只重新构建修改过的包，非常快。

## 📄 License

MIT
