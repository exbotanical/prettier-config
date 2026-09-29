import { definePlugin, passThrough } from '../plugin-definition'

/**
 * Options for prettier-plugin-solidity. Its `bracketSpacing`, `singleQuote`,
 * `experimentalTernaries`, and `experimentalOperatorPosition` options are Prettier core
 * options, set through `core`.
 */
export interface OptionsSolidity {
  /**
   * The Solidity compiler version the code targets, which the formatter uses to avoid
   * syntax said version does not support.
   */
  compiler?: string
}

export const solidity = definePlugin({
  key: 'solidity',
  packageName: 'prettier-plugin-solidity',
  defaults: {},
  configure: passThrough,
})
