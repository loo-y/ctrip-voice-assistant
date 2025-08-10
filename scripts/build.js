import fs from 'fs-extra';
import { resolve } from 'path';
import { execSync } from 'child_process';

// 确保dist目录存在
fs.ensureDirSync('dist');

// 复制manifest.json到dist目录
fs.copySync('manifest.json', 'dist/manifest.json');

// 复制assets目录到dist目录
fs.copySync('assets', 'dist/assets');

// 复制popup目录到dist目录（仅HTML和JS文件）
fs.copySync('src/popup/popup.html', 'dist/popup/popup.html');
fs.copySync('src/popup/popup.js', 'dist/popup/popup.js');

// 复制options目录到dist目录（仅HTML和JS文件）
fs.copySync('src/options/options.html', 'dist/options/options.html');
fs.copySync('src/options/options.js', 'dist/options/options.js');

// 复制content目录中的CSS文件
fs.copySync('src/style/tailwind.output.css', 'dist/style/tailwind.output.css');

// 使用esbuild打包content脚本
console.log('Bundling content script...');
execSync('node scripts/bundle-content.js', { stdio: 'inherit' });

console.log('Build completed successfully!');