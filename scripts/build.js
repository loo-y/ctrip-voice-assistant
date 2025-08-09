import fs from 'fs-extra';
import { resolve } from 'path';

// 确保dist目录存在
fs.ensureDirSync('dist');

// 复制manifest.json到dist目录
fs.copySync('manifest.json', 'dist/manifest.json');

// 复制assets目录到dist目录
fs.copySync('assets', 'dist/assets');

// 复制popup目录到dist目录
fs.copySync('src/popup', 'dist/popup');

// 复制options目录到dist目录
fs.copySync('src/options', 'dist/options');

console.log('Build completed successfully!');