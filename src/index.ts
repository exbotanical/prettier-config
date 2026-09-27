import {
  PLUGIN_MAPPINGS,
  PLUGIN_NAMES,
  resolveAllPlugins,
  resolvePluginPaths,
} from './plugins'

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

  const packageNames = PLUGIN_NAMES.filter(name => enabledPlugins[name]).map(
    name => PLUGIN_MAPPINGS[name],
  )

  return {
    ...PRETTIER_OPTIONS,
    plugins: resolvePluginPaths(packageNames),
  }
}
