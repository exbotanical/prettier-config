import { copyFile } from 'node:fs/promises'
import { createRequire } from 'node:module'

import { defineConfig } from 'tsup'

const require = createRequire(import.meta.url)

export default defineConfig({
  entry: ['src/index.ts'],
  shims: true,
  format: ['esm'],
  // The shell plugin's function spacing needs tree-sitter-bash's WASM grammar at runtime.
  // tree-sitter-bash is a devDependency, because its package is 20 MB and runs a native
  // install script, so the build copies its 1.4 MB grammar into dist instead.
  async onSuccess() {
    await copyFile(
      require.resolve('tree-sitter-bash/tree-sitter-bash.wasm'),
      'dist/tree-sitter-bash.wasm',
    )
  },
})
