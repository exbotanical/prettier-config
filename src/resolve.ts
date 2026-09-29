import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { resolveModule } from 'local-pkg'

import type { Plugin } from 'prettier'

const PACKAGE_DIR = fileURLToPath(new URL('.', import.meta.url))

/**
 * Returns the absolute path of the entry file of `packageName`, or `undefined` when Node
 * cannot resolve it. Node's module resolution runs from two starting points, in order: (1)
 * the directory in which this package is installed; then, (2) the current working
 * directory. Path 1 finds plugins the consumer installed as peer dependencies of this
 * package, including those kept outside the project's top-level node_modules (which some
 * package managers do e.g. pnpm). Path 2 finds plugins installed only in the project in
 * which Prettier runs.
 */
export function resolvePackagePath(packageName: string): string | undefined {
  return resolveModule(packageName, { paths: [PACKAGE_DIR, `${process.cwd()}/`] })
}

/**
 * Imports a Prettier plugin package and returns its plugin object. Throws an error that
 * names the package when it is not installed.
 */
export async function loadPlugin(packageName: string): Promise<Plugin> {
  const path = resolvePackagePath(packageName)
  if (!path) {
    throw new Error(
      `@exbotanical/prettier-config: install the prettier plugin ${packageName}`,
    )
  }

  const loaded: Plugin & { default?: Plugin } = await import(pathToFileURL(path).href)
  return loaded.default ?? loaded
}

/**
 * Imports `packageName` as resolved from the directory of `fromPath` and returns the
 * module. Node's module resolution starts in the directory of `fromPath`, so this loads a
 * package that is a dependency of the package containing `fromPath`, even when neither this
 * package nor the consumer depends on it directly. Throws when `packageName` cannot be
 * resolved from that directory.
 */
export async function importFrom<T>(packageName: string, fromPath: string): Promise<T> {
  const path = resolveModule(packageName, { paths: [fromPath] })
  if (!path) {
    throw new Error(`@exbotanical/prettier-config: cannot resolve ${packageName}`)
  }

  const loaded: T = await import(pathToFileURL(path).href)
  return loaded
}
