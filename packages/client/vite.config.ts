import {resolve} from "path";
import wyw from '@wyw-in-js/vite';

export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'file0',
      // the proper extensions will be added
      fileName: 'index',
    },
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
