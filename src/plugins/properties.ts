import { definePlugin, passThrough } from '../plugin-definition'

/** Options for prettier-plugin-properties. */
export interface OptionsProperties {
  /**
   * Rewrites characters outside Latin-1 as `\u` escapes, so the file can be saved as
   * ISO-8859-1.
   * @default false
   */
  escapeNonLatin1?: boolean

  /**
   * The separator printed between each key and its value.
   * @default ' = '
   */
  keySeparator?: ' ' | ':' | ': ' | ' : ' | '=' | '= ' | ' = '
}

export const properties = definePlugin({
  key: 'properties',
  packageName: 'prettier-plugin-properties',
  defaults: {},
  configure: passThrough,
})
