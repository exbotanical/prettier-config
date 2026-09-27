import { isPackageExists } from 'local-pkg'

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

/**
 * Enables each plugin that is resolvable from the current working directory.
 */
export function resolveAllPlugins(): OptionsPlugins {
  return {
    xml: isPackageExists(PLUGIN_MAPPINGS.xml),
    toml: isPackageExists(PLUGIN_MAPPINGS.toml),
    shell: isPackageExists(PLUGIN_MAPPINGS.shell),
    nginx: isPackageExists(PLUGIN_MAPPINGS.nginx),
    properties: isPackageExists(PLUGIN_MAPPINGS.properties),
    sql: isPackageExists(PLUGIN_MAPPINGS.sql),
    solidity: isPackageExists(PLUGIN_MAPPINGS.solidity),
    ini: isPackageExists(PLUGIN_MAPPINGS.ini),
  }
}
