export interface OptionsPlugins {
  /**
   * Enables XML formatting.
   *
   * @default true
   */
  xml?: boolean

  /**
   * Enables shell formatting.
   *
   * @default true
   */
  shell?: boolean

  /**
   * Enables TOML formatting.
   *
   * @default true
   */
  toml?: boolean

  /**
   * Enables nginx formatting.
   *
   * @default false
   */
  nginx?: boolean

  /**
   * Enables .properties file formatting.
   *
   * @default false
   */
  properties?: boolean

  /**
   * Enables SQL formatting.
   *
   * @default false
   */
  sql?: boolean

  /**
   * Enables solidity formatting.
   *
   * @default false
   */
  solidity?: boolean
}

export const PLUGIN_MAPPINGS: Record<keyof OptionsPlugins, string> = {
  xml: '@prettier/plugin-xml',
  toml: 'prettier-plugin-toml',
  shell: 'prettier-plugin-sh',
  nginx: 'prettier-plugin-nginx',
  properties: 'prettier-plugin-properties',
  sql: 'prettier-plugin-sql',
  solidity: 'prettier-plugin-solidity',
}
