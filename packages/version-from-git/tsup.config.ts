import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      'version-from-git': './src/index.mts'
    },
    format: ['esm'],
    sourcemap: true
  }
]);
