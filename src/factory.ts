import { PRETTIER_OPTIONS } from './core'
import { PLUGINS } from './plugins'

import type { OptionsPrettier } from './options'
import type { Config } from 'prettier'

/**
 * Builds the Prettier config. Loads each enabled plugin and returns a promise which resolves to a prettier `Config`.
 */
export async function exbotanical(options: OptionsPrettier = {}): Promise<Config> {
  const resolved = await Promise.all(PLUGINS.map(plugin => plugin.resolve(options)))
  const fragments = resolved.filter(fragment => fragment !== null)

  const pluginOptions: Record<string, unknown> = {}
  for (const fragment of fragments) Object.assign(pluginOptions, fragment.options)

  return {
    ...PRETTIER_OPTIONS,
    ...options.core,
    ...pluginOptions,
    plugins: fragments.map(fragment => fragment.plugin),
  }
}
