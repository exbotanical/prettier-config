import { definePlugin, passThrough } from '../plugin-definition'

/** Options for prettier-plugin-toml. */
export interface OptionsToml {
  /**
   * The TOML specification version used to parse and format.
   * @default 'v1.0.0'
   */
  tomlVersion?: 'v1.0.0' | 'v1.1.0' | 'v1.1.0-preview'

  /**
   * The number of spaces inside the brackets of a single-line array.
   * @default 0
   */
  arrayBracketSpaceWidth?: number

  /**
   * The number of spaces after each comma in a single-line array.
   * @default 1
   */
  arrayCommaSpaceWidth?: number

  /**
   * `normalize` adds a space after `#`, except in `#!` lines; `preserve` keeps comments as
   * written.
   * @default 'normalize'
   */
  commentStyle?: 'normalize' | 'preserve'

  /**
   * The character between the date and the time in date-time values.
   * @default 'T'
   */
  dateTimeDelimiter?: 'T' | 'space' | 'preserve'

  /**
   * The maximum number of blank lines kept between groups of entries. Must be at least 1.
   * @default 1
   */
  groupBlankLinesLimit?: number

  /**
   * Indents subtables, and their entries, under the parent table.
   * @default false
   */
  indentSubTables?: boolean

  /**
   * Indents entries under their table header.
   * @default true
   */
  indentTableKeyValuePairs?: boolean

  /**
   * The number of spaces inside the braces of a single-line inline table. Defaults to 1 or 0
   * from `bracketSpacing`.
   */
  inlineTableBraceSpaceWidth?: number

  /**
   * The number of spaces after each comma in a single-line inline table.
   * @default 1
   */
  inlineTableCommaSpaceWidth?: number

  /**
   * Aligns the `=` of consecutive entries in one column.
   * @default false
   */
  keyValueEqualsSignAlignment?: boolean

  /**
   * The number of spaces on each side of `=`.
   * @default 1
   */
  keyValueEqualsSignSpaceWidth?: number

  /**
   * The quote character for quoted keys. Defaults to `stringQuoteStyle`.
   */
  keyQuoteStyle?: 'double' | 'single' | 'preserve'

  /**
   * The quote character for strings. Strings that contain escapes keep double quotes, so
   * the value does not change. Defaults to `single` or `double` from `singleQuote`.
   */
  stringQuoteStyle?: 'double' | 'single' | 'preserve'

  /**
   * Aligns the trailing comments of consecutive entries in one column.
   * @default false
   */
  trailingCommentAlignment?: boolean

  /**
   * The number of spaces before a trailing comment.
   * @default 2
   */
  trailingCommentSpaceWidth?: number

  /**
   * The number of blank lines printed between tables.
   * @default 1
   */
  tableBlankLines?: number
}

export const toml = definePlugin({
  key: 'toml',
  packageName: 'prettier-plugin-toml',
  defaults: { indentTableKeyValuePairs: true },
  configure: passThrough,
})
