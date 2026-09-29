import type { OptionsIni } from './plugins/ini'
import type { OptionsNginx } from './plugins/nginx'
import type { OptionsProperties } from './plugins/properties'
import type { OptionsShell } from './plugins/shell/options'
import type { OptionsSolidity } from './plugins/solidity'
import type { OptionsSql } from './plugins/sql'
import type { OptionsToml } from './plugins/toml'
import type { OptionsXml } from './plugins/xml'
import type { Options } from 'prettier'

/**
 * Options for the config factory. Each plugin key enables that plugin: `true` uses its
 * defaults, and an object sets its options. Each plugin is an optional peer dependency
 * that must be installed when enabled.
 */
export interface OptionsPrettier {
  /** Prettier core options. */
  core?: Options

  /**
   * Formats XML with @prettier/plugin-xml.
   * @default false
   */
  xml?: boolean | OptionsXml

  /**
   * Formats shell scripts with prettier-plugin-sh.
   * @default false
   */
  shell?: boolean | OptionsShell

  /**
   * Formats TOML with prettier-plugin-toml.
   * @default false
   */
  toml?: boolean | OptionsToml

  /**
   * Formats INI files, including `.gitconfig` and `.editorconfig`, with
   * prettier-plugin-ini.
   * @default false
   */
  ini?: boolean | OptionsIni

  /**
   * Formats Java `.properties` files with prettier-plugin-properties.
   * @default false
   */
  properties?: boolean | OptionsProperties

  /**
   * Formats nginx configuration with prettier-plugin-nginx.
   * @default false
   */
  nginx?: boolean | OptionsNginx

  /**
   * Formats SQL with prettier-plugin-sql.
   * @default false
   */
  sql?: boolean | OptionsSql

  /**
   * Formats Solidity with prettier-plugin-solidity.
   * @default false
   */
  solidity?: boolean | OptionsSolidity
}
