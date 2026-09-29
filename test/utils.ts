import * as prettier from 'prettier'

import exbotanical from '../src'

import type { OptionsPrettier } from '../src'
import type { Options, Plugin, SupportLanguage } from 'prettier'

/**
 * Formats `input` as the file at `filepath` with the config that `exbotanical` builds from
 * `options`. `extra` adds Prettier options on top of that config, as an override would.
 */
export async function format(
  input: string,
  filepath: string,
  options: OptionsPrettier,
  extra: Options = {},
): Promise<string> {
  const config = await exbotanical(options)
  return prettier.format(input, { ...config, ...extra, filepath })
}

/** Returns the plugin objects in the config that `exbotanical` builds from `options`. */
export async function pluginsFor(options: OptionsPrettier): Promise<Plugin[]> {
  const { plugins = [] } = await exbotanical(options)
  return plugins.filter(isPluginObject)
}

/**
 * Returns the languages that the config's plugins register for `parser`. Throws when no
 * enabled plugin provides that parser.
 */
export async function languagesFor(
  options: OptionsPrettier,
  parser: string,
): Promise<SupportLanguage[]> {
  const plugins = await pluginsFor(options)
  const plugin = plugins.find(candidate => candidate.parsers?.[parser] !== undefined)
  if (!plugin?.languages) {
    throw new Error(`no enabled plugin provides the ${parser} parser`)
  }
  return plugin.languages
}

/** Returns whether `language` claims the file at `filepath` through its `isSupported`. */
export function claims(language: SupportLanguage, filepath: string): boolean {
  return language.isSupported?.({ filepath }) ?? false
}

function isPluginObject(plugin: Plugin | string | URL): plugin is Plugin {
  return typeof plugin === 'object' && !(plugin instanceof URL)
}
