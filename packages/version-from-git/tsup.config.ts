import { defineConfig } from 'tsup';

export default defineConfig([
  {
    dts: true,
    entry: {
      'version-from-git': './src/index.ts'
    },
    format: 'esm',
    sourcemap: true
  }
]);
