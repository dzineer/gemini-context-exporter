import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/main.jsx'),
      },
      output: {
        entryFileNames: 'content.js',
        inlineDynamicImports: true,
        assetFileNames: '[name].[ext]',
      },
    },
    cssCodeSplit: false,
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : false,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
});
