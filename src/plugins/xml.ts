import { definePlugin, passThrough } from '../plugin-definition'

/** Options for @prettier/plugin-xml. */
export interface OptionsXml {
  /**
   * Adds a space before `/>` in self-closing tags.
   * @default true
   */
  xmlSelfClosingSpace?: boolean

  /**
   * How whitespace inside elements is handled: `strict` keeps it as written, `preserve`
   * re-indents whitespace-only text between elements, and `ignore` also reflows text.
   * @default 'strict'
   */
  xmlWhitespaceSensitivity?: 'strict' | 'preserve' | 'ignore'

  /**
   * Sorts attributes alphabetically, with `xmlns` attributes first.
   * @default false
   */
  xmlSortAttributesByKey?: boolean

  /**
   * The quote character around attribute values. `double` escapes embedded double quotes.
   * @default 'preserve'
   */
  xmlQuoteAttributes?: 'preserve' | 'single' | 'double'
}

export const xml = definePlugin({
  key: 'xml',
  packageName: '@prettier/plugin-xml',
  defaults: {},
  configure: passThrough,
})
