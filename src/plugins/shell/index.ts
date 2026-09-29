import { definePlugin } from '../../plugin-definition'

import { toShellPrettierOptions } from './options'

export const shell = definePlugin({
  key: 'shell',
  packageName: 'prettier-plugin-sh',
  defaults: { variant: 'bash' },
  configure: (loaded, options) => ({
    plugin: loaded,
    options: toShellPrettierOptions(options),
  }),
})
