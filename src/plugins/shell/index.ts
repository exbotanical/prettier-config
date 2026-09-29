import { definePlugin } from '../../plugin-definition'

import { DEFAULT_SHELL_FILES, DEFAULT_SHELL_INTERPRETERS } from './languages'
import { toShellPrettierOptions } from './options'
import { createShellPlugin } from './plugin'

export const shell = definePlugin({
  key: 'shell',
  packageName: 'prettier-plugin-sh',
  defaults: {
    variant: 'bash',
    files: DEFAULT_SHELL_FILES,
    interpreters: DEFAULT_SHELL_INTERPRETERS,
  },
  configure: (loaded, options) => ({
    plugin: createShellPlugin(
      loaded,
      options.files ?? DEFAULT_SHELL_FILES,
      options.interpreters ?? DEFAULT_SHELL_INTERPRETERS,
    ),
    options: toShellPrettierOptions(options),
  }),
})
