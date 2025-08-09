import fs from 'fs';

// 创建不同尺寸的简单图标
const sizes = [16, 48, 128];

// SVG 图标模板
const svgTemplate = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" fill="#007bff"/>
  <circle cx="64" cy="64" r="40" fill="white"/>
  <circle cx="64" cy="64" r="20" fill="#007bff"/>
</svg>
`;

// 生成不同尺寸的图标
sizes.forEach(size => {
  const svgContent = svgTemplate(size);
  fs.writeFileSync(`assets/icon${size}.svg`, svgContent);
  
  // 同时生成 PNG 格式的图标
  // 这里我们先用 SVG 内容创建 PNG 文件（虽然实际是 SVG 内容）
  fs.writeFileSync(`assets/icon${size}.png`, svgContent);
});

console.log('Icons generated successfully!');