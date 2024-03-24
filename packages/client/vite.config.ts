import externalize from "vite-plugin-externalize-dependencies";
export default {
  esbuild: {
    jsxFactory: 'createElement',
    jsxFragment: 'Fragment',
    format: 'esm',
    minify: false,
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: "[name][extname]",
        format: 'esm',
      },
      external: ['socket:fs/promises', 'socket:application'],
      exclude: ['socket:fs/promises', 'socket:application']
    },
    minify: false,
  },

  optimizeDeps: {
    disabled: true,
    external: ['socket:fs/promises', 'socket:application'],
    exclude: ['socket:fs/promises', 'socket:application']
  },
  external: ['socket:fs/promises', 'socket:application'],
  plugins: [
    externalize({
      externals: ['socket:fs/promises', 'socket:application'],
    }),
  ],
  define: {
    __DEV__: false,
  },
}
