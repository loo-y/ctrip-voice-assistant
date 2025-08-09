import { build } from 'esbuild';
import { resolve } from 'path';

// 打包content脚本
async function bundleContentScript() {
  try {
    await build({
      entryPoints: ['src/content/index.tsx'],
      bundle: true,
      outfile: 'dist/content/index.js',
      format: 'iife',
      globalName: 'CtripVoiceAssistant',
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      define: {
        'process.env.NODE_ENV': '"production"'
      },
      external: ['chrome'],
      minify: true,
      sourcemap: false
    });
    console.log('Content script bundled successfully!');
  } catch (error) {
    console.error('Error bundling content script:', error);
    process.exit(1);
  }
}

bundleContentScript();