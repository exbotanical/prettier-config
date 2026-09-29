import { definePlugin, passThrough } from '../plugin-definition'

/** Options for prettier-plugin-ini. */
export interface OptionsIni {
  /**
   * Prints `key = value` instead of `key=value`.
   * @default false
   */
  iniSpaceAroundEquals?: boolean
}

export const ini = definePlugin({
  key: 'ini',
  packageName: 'prettier-plugin-ini',
  defaults: {},
  configure: passThrough,
})
