import { definePlugin, passThrough } from '../plugin-definition'

/** Options for prettier-plugin-nginx. */
export interface OptionsNginx {
  /**
   * Aligns the parameters of the directives in each block in one column.
   * @default true
   */
  alignDirectives?: boolean

  /**
   * Aligns directive parameters in one column across the whole file. Requires
   * `alignDirectives`.
   * @default false
   */
  alignUniversally?: boolean

  /**
   * Moves parameters onto continuation lines when a directive exceeds `printWidth`.
   * @default true
   */
  wrapParameters?: boolean

  /**
   * The extra indentation of continuation lines.
   * @default 2
   */
  continuationIndent?: number
}

export const nginx = definePlugin({
  key: 'nginx',
  packageName: 'prettier-plugin-nginx',
  defaults: {},
  configure: passThrough,
})
