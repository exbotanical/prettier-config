import process from 'node:process'
import { fileURLToPath } from 'node:url'

import { resolveModule } from 'local-pkg'

export interface OptionsPlugins {
  /**
   * Enables XML formatting.
   *
   * Requires installing:
   * - @prettier/plugin-xml
   *
   * @default false
   */
  xml?: boolean

  /**
   * Enables shell formatting.
   *
   * Requires installing:
   * - prettier-plugin-sh
   *
   * @default false
   */
  shell?: boolean

  /**
   * Enables TOML formatting.
   *
   * Requires installing:
   * - prettier-plugin-toml
   *
   * @default false
   */
  toml?: boolean

  /**
   * Enables nginx formatting.
   *
   * Requires installing:
   * - prettier-plugin-nginx
   *
   * @default false
   */
  nginx?: boolean

  /**
   * Enables .properties file formatting.
   *
   * Requires installing:
   * - prettier-plugin-properties
   *
   * @default false
   */
  properties?: boolean

  /**
   * Enables SQL formatting.
   *
   * Requires installing:
   * - prettier-plugin-sql
   *
   * @default false
   */
  sql?: boolean

  /**
   * Enables solidity formatting.
   *
   * Requires installing:
   * - prettier-plugin-solidity
   *
   * @default false
   */
  solidity?: boolean

  /**
   * Enables INI formatting, including .gitconfig and .editorconfig files.
   *
   * Requires installing:
   * - prettier-plugin-ini
   *
   * @default false
   */
  ini?: boolean
}

export const PLUGIN_MAPPINGS: Record<keyof OptionsPlugins, string> = {
  xml: '@prettier/plugin-xml',
  toml: 'prettier-plugin-toml',
  shell: 'prettier-plugin-sh',
  nginx: 'prettier-plugin-nginx',
  properties: 'prettier-plugin-properties',
  sql: 'prettier-plugin-sql',
  solidity: 'prettier-plugin-solidity',
  ini: 'prettier-plugin-ini',
}

export const PLUGIN_NAMES: (keyof OptionsPlugins)[] = [
  'xml',
  'toml',
  'shell',
  'nginx',
  'properties',
  'sql',
  'solidity',
  'ini',
]

const PACKAGE_DIR = fileURLToPath(new URL('.', import.meta.url))

/**
 * Enables each plugin that is resolvable by resolvePluginPath.
 */
export function resolveAllPlugins(): OptionsPlugins {
  return {
    xml: isPluginInstalled(PLUGIN_MAPPINGS.xml),
    toml: isPluginInstalled(PLUGIN_MAPPINGS.toml),
    shell: isPluginInstalled(PLUGIN_MAPPINGS.shell),
    nginx: isPluginInstalled(PLUGIN_MAPPINGS.nginx),
    properties: isPluginInstalled(PLUGIN_MAPPINGS.properties),
    sql: isPluginInstalled(PLUGIN_MAPPINGS.sql),
    solidity: isPluginInstalled(PLUGIN_MAPPINGS.solidity),
    ini: isPluginInstalled(PLUGIN_MAPPINGS.ini),
  }
}

/**
 * Resolves each plugin package to the absolute path of its entry file. Prettier resolves bare
 * plugin names from the directory it runs in; a file path makes it load the plugin directly,
 * which prevents `Cannot find package` when the plugin is not reachable from there, as in a
 * pnpm workspace package with hoisting disabled. With npm or default pnpm hoisting, the
 * result is the same as using bare names. Throws when a plugin is not resolvable.
 */
export function resolvePluginPaths(packageNames: string[]): string[] {
  const resolved = packageNames.map(name => ({ name, path: resolvePluginPath(name) }))
  const missing = resolved.filter(({ path }) => !path).map(({ name }) => name)

  if (missing.length > 0) {
    throw new Error(
      `@exbotanical/prettier-config: install the enabled prettier plugins: ${missing.join(', ')}`,
    )
  }

  return resolved.flatMap(({ path }) => (path ? [path] : []))
}

function isPluginInstalled(packageName: string): boolean {
  return resolvePluginPath(packageName) !== undefined
}

/**
 * Resolves a plugin from this package's directory first, where package managers link peer
 * dependencies, and then from the current working directory.
 */
function resolvePluginPath(packageName: string): string | undefined {
  return resolveModule(packageName, { paths: [PACKAGE_DIR, `${process.cwd()}/`] })
}
