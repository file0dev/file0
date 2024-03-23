import {resolve} from "path";
import wyw from '@wyw-in-js/vite';

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: "[name][extname]"
      }
    }
  },
  plugins: [
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript'],
      },
    }),
  ],
  define: {
    __DEV__: false,
  },
}
