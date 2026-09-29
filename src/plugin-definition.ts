import { loadPlugin } from './resolve'

import type { OptionsPrettier } from './options'
import type { Plugin } from 'prettier'

/** A factory option key that enables a plugin. */
export type PluginKey = Exclude<keyof OptionsPrettier, 'core'>

/** The options object accepted by the plugin enabled with `K`. */
export type PluginOptions<K extends PluginKey> = Exclude<
  NonNullable<OptionsPrettier[K]>,
  boolean
>

/** The plugin object and the Prettier options that one enabled plugin adds to the config. */
export interface PluginFragment {
  plugin: Plugin
  options: object
}

/** The declarative description of one supported Prettier plugin. */
export interface PluginDefinition<K extends PluginKey> {
  /** The factory option that enables the plugin. */
  key: K
  /** The npm package that provides the Prettier plugin. */
  packageName: string
  /** The options applied when the plugin is enabled, merged under the user's options. */
  defaults: PluginOptions<K>
  /** Builds the plugin object and the Prettier options from the loaded package. */
  configure: (
    loaded: Plugin,
    options: PluginOptions<K>,
  ) => PluginFragment | Promise<PluginFragment>
}

/** A plugin definition bound to its option key, as the factory consumes it. */
export interface ConfiguredPlugin {
  key: PluginKey
  resolve: (options: OptionsPrettier) => Promise<null | PluginFragment>
}

/**
 * Binds a plugin definition to its factory option. When the option is `true` or an object,
 * the plugin package is loaded and configured with its defaults merged under the user's
 * options; when it is absent or `false`, the plugin is skipped.
 */
export function definePlugin<K extends PluginKey>(
  definition: PluginDefinition<K>,
): ConfiguredPlugin {
  return {
    key: definition.key,
    async resolve(options) {
      const value = options[definition.key]
      if (!value) return null

      const merged = isOptionsObject(value)
        ? Object.assign({}, definition.defaults, value)
        : definition.defaults
      return definition.configure(await loadPlugin(definition.packageName), merged)
    },
  }
}

/** Passes the loaded plugin through unchanged and sets its options at the top level. */
export function passThrough<K extends PluginKey>(
  loaded: Plugin,
  options: PluginOptions<K>,
): PluginFragment {
  return { plugin: loaded, options }
}

function isOptionsObject<K extends PluginKey>(
  value: OptionsPrettier[K],
): value is PluginOptions<K> {
  return typeof value === 'object' && value !== null
}
