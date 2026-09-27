import { PLUGIN_MAPPINGS, resolveAllPlugins } from './plugins'

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
}: OptionsPrettier = {}): Config {
  const enabledPlugins = pluginOpts === 'all' ? resolveAllPlugins() : pluginOpts

  const plugins: string[] = Object.entries(PLUGIN_MAPPINGS)
    .filter(([key]) => enabledPlugins[key as keyof OptionsPlugins])
    .map(([_key, value]) => value)

  return {
    ...PRETTIER_OPTIONS,
    plugins,
  }
}
