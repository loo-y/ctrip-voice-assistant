# 项目交接文档

## 项目概述

携程语音助手是一个 Chrome 扩展，旨在为携程旅行网站用户提供语音交互功能。该扩展在用户访问携程网站时添加一个语音助手按钮，用户可以通过语音与网站进行交互。

## 技术架构

### 核心技术栈
- **语言**: TypeScript
- **框架**: React
- **状态管理**: Zustand
- **打包工具**: esbuild
- **构建工具**: 自定义 Node.js 脚本

### 项目结构
```
ctrip-voice-assistant/
├── assets/              # 扩展图标等静态资源
├── dist/                # 构建后的扩展文件（由构建脚本生成）
├── scripts/             # 构建和打包脚本
├── src/                 # 源代码
│   ├── content/         # 内容脚本（在携程网站上运行）
│   ├── options/         # 扩展选项页面
│   └── popup/           # 扩展弹出页面
├── manifest.json        # Chrome 扩展清单文件
└── package.json         # 项目配置和依赖
```

## 关键实现细节

### 1. Chrome 扩展配置
- 使用 Manifest V3 规范
- 内容脚本仅在 `https://vacations.ctrip.com/*` 域名下注入
- 包含必要的权限声明：`activeTab`, `scripting`, `storage`

### 2. 构建系统
构建过程包含以下步骤：
1. 使用 TypeScript 编译器编译源代码
2. 使用 esbuild 打包内容脚本，将所有依赖合并成单个兼容文件
3. 复制静态资源到 dist 目录
4. 处理 manifest.json 和其他 HTML 文件

**重要**: 内容脚本需要特殊处理，因为 Chrome 扩展的内容脚本不能直接使用 ES6 模块导入。我们使用 esbuild 将所有依赖打包成一个 IIFE (立即调用函数表达式) 格式的文件来解决这个问题。

### 3. 内容脚本功能
- 在页面上创建一个固定位置的语音助手按钮
- 使用 CSS 动画提供视觉反馈
- 使用 Zustand 管理语音识别状态

## 开发和部署流程

### 开发环境设置
1. 克隆项目仓库
2. 运行 `npm install` 安装依赖

### 构建扩展
运行 `npm run build` 命令来构建扩展。构建后的文件将位于 `dist/` 目录中。

### 在 Chrome 中加载扩展
1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 启用"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择 `dist` 目录

### 开发模式
在开发过程中，可以使用 `npm run watch` 命令来监听文件变化并自动重新编译。

## 已知问题和解决方案

### 1. Chrome 扩展加载错误
**问题**: "无法为脚本加载重叠样式表" 和 "无法加载清单" 错误
**解决方案**: 
- 确保构建脚本正确复制所有必需的文件到 dist 目录
- 确保 manifest.json 中引用的文件路径正确

### 2. 模块导入错误
**问题**: "Uncaught SyntaxError: Cannot use import statement outside a module"
**解决方案**: 
- 使用 esbuild 将内容脚本打包成 IIFE 格式的单个文件
- 避免在内容脚本中直接使用 ES6 模块语法

## 未来改进方向

1. **语音识别功能完善**: 目前只有 UI，可以进一步实现完整的语音识别和处理逻辑
2. **用户界面优化**: 可以添加更多视觉反馈和交互效果
3. **错误处理**: 添加更完善的错误处理和用户提示
4. **性能优化**: 优化打包大小和运行时性能
5. **多语言支持**: 添加国际化支持

## 关键文件说明

### manifest.json
Chrome 扩展的配置文件，定义了扩展的基本信息、权限和资源。

### scripts/build.js
主要的构建脚本，负责：
- 复制静态资源
- 调用 TypeScript 编译器
- 使用 esbuild 打包内容脚本
- 处理文件结构

### scripts/bundle-content.js
专门用于打包内容脚本的 esbuild 配置，将 React 组件和所有依赖打包成一个兼容的文件。

### src/content/
内容脚本源代码，包括：
- `index.tsx`: 入口文件，创建和挂载 React 组件
- `VoiceAssistant.tsx`: 语音助手组件
- `store.ts`: 使用 Zustand 的状态管理

## 依赖说明

### 生产依赖
- `react` 和 `react-dom`: React 框架
- `zustand`: 轻量级状态管理库

### 开发依赖
- `typescript`: TypeScript 编译器
- `esbuild`: 高性能打包工具
- `@types/*`: TypeScript 类型定义
- `fs-extra`: 文件系统操作工具

## 故障排除

1. **扩展无法加载**:
   - 检查 `dist` 目录是否包含所有必需文件
   - 验证 manifest.json 格式是否正确

2. **内容脚本不工作**:
   - 检查浏览器控制台错误
   - 确认 URL 匹配模式是否正确

3. **构建失败**:
   - 确保所有依赖已正确安装
   - 检查 TypeScript 编译错误