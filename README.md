# 携程语音助手 Chrome 扩展

这是一个为携程旅行网站 (https://vacations.ctrip.com/*) 提供语音助手功能的 Chrome 扩展。

## 功能特性

- 在携程旅行网站上添加语音助手按钮
- 通过语音与携程网站进行交互
- 简洁美观的用户界面

## 安装和使用

### 开发环境设置

1. 克隆项目仓库：
   ```bash
   git clone <repository-url>
   cd ctrip-voice-assistant
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

### 构建扩展

运行以下命令来构建扩展：

```bash
npm run build
```

构建后的文件将位于 `dist/` 目录中。

### 在 Chrome 中加载扩展

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 启用右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目中的 `dist` 目录

### 开发模式

在开发过程中，您可以使用以下命令来监听文件变化并自动重新编译：

```bash
npm run watch
```

## 项目结构

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

## 技术栈

- TypeScript
- React
- Zustand（状态管理）
- Chrome Extension API

## 构建过程

本项目使用以下工具进行构建：

1. TypeScript 编译器 (tsc) - 编译 TypeScript 代码
2. esbuild - 打包内容脚本，将所有依赖合并成单个文件
3. 自定义构建脚本 - 复制静态资源和处理文件结构

## 注意事项

- 扩展仅在 `https://vacations.ctrip.com/*` 域名下工作
- 扩展需要访问麦克风权限以实现语音识别功能