import { PLUGIN_MAPPINGS } from './plugins'

import type { OptionsPlugins } from './plugins'
import type { Options, Config } from 'prettier'

export interface OptionsPrettier {
  plugins?: OptionsPlugins | 'all'
}

export const PRETTIER_OPTIONS: Options = {
  useTabs: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'all',
  arrowParens: 'avoid',
  semi: false,
  printWidth: 90,
  bracketSpacing: true,
}

export default function exbotanical({
  plugins: pluginOpts = {},
}: OptionsPrettier): Config {
  if (pluginOpts === 'all') {
    // eslint-disable-next-line no-param-reassign -- non-library or app, just a config
    pluginOpts = {
      xml: true,
      shell: true,
      toml: true,
      nginx: false,
      properties: false,
      sql: false,
      solidity: false,
    }
  }

  const plugins: string[] = Object.entries(PLUGIN_MAPPINGS)
    .filter(([key]) => pluginOpts[key as keyof OptionsPlugins])
    .map(([_key, value]) => value)

  return {
    ...PRETTIER_OPTIONS,
    plugins,
  }
}
