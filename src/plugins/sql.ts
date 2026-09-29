import { definePlugin, passThrough } from '../plugin-definition'

/** The case a sql option converts names to. */
export type SqlLetterCase = 'lower' | 'preserve' | 'upper'

/** Options for prettier-plugin-sql. */
export interface OptionsSql {
  /**
   * The formatting engine.
   * @default 'sql-formatter'
   */
  formatter?: 'node-sql-parser' | 'sql-cst' | 'sql-formatter'

  /**
   * The SQL dialect that `sql-formatter` parses.
   * @default 'sql'
   */
  language?:
    | 'bigquery'
    | 'clickhouse'
    | 'db2'
    | 'db2i'
    | 'hive'
    | 'mariadb'
    | 'mysql'
    | 'n1ql'
    | 'plsql'
    | 'postgresql'
    | 'redshift'
    | 'singlestoredb'
    | 'snowflake'
    | 'spark'
    | 'sql'
    | 'sqlite'
    | 'transactsql'
    | 'trino'
    | 'tsql'

  /** The `sql-formatter` dialect selected through its `formatDialect()` API. */
  dialect?: string

  /**
   * The case of SQL keywords.
   * @default 'preserve'
   */
  keywordCase?: SqlLetterCase

  /**
   * The case of data type names.
   * @default 'preserve'
   */
  dataTypeCase?: SqlLetterCase

  /**
   * The case of function names.
   * @default 'preserve'
   */
  functionCase?: SqlLetterCase

  /**
   * The case of unquoted identifiers (experimental in the plugin).
   * @default 'preserve'
   */
  identifierCase?: SqlLetterCase

  /**
   * The indentation layout. The tabular styles put keywords in a fixed-width left column.
   * @default 'standard'
   */
  indentStyle?: 'standard' | 'tabularLeft' | 'tabularRight'

  /**
   * Whether `AND` and `OR` start or end each wrapped condition line.
   * @default 'before'
   */
  logicalOperatorNewline?: 'after' | 'before'

  /**
   * The maximum length of a parenthesized expression kept on one line.
   * @default 50
   */
  expressionWidth?: number

  /**
   * The number of blank lines printed between statements.
   * @default 1
   */
  linesBetweenQueries?: number

  /**
   * Removes the spaces around arithmetic and comparison operators.
   * @default false
   */
  denseOperators?: boolean

  /**
   * Puts each statement's `;` on its own line.
   * @default false
   */
  newlineBeforeSemicolon?: boolean

  /** Values that replace placeholders such as `?`, written as a JSOX string. */
  params?: string

  /** The placeholder syntaxes the parser accepts, written as a JSOX string. */
  paramTypes?: string

  /**
   * The authority-list check that `node-sql-parser` runs.
   * @default 'table'
   */
  type?: 'column' | 'table'

  /**
   * The SQL dialect that `node-sql-parser` parses.
   * @default 'mysql'
   */
  database?:
    | 'bigquery'
    | 'db2'
    | 'flinksql'
    | 'hive'
    | 'mariadb'
    | 'mysql'
    | 'postgresql'
    | 'snowflake'
    | 'transactsql'
}

export const sql = definePlugin({
  key: 'sql',
  packageName: 'prettier-plugin-sql',
  defaults: {},
  configure: passThrough,
})
