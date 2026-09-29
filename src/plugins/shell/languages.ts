import { createPathMatcher } from '../../globs'

import type { SupportLanguage } from 'prettier'

/** The shell file globs used when `shell.files` is not set. */
export const DEFAULT_SHELL_FILES = [
  '**/*.sh',
  '**/*.bash',
  '**/*.zsh',
  ...[
    'bashrc',
    'bash_profile',
    'bash_logout',
    'bash_aliases',
    'bash_functions',
    'profile',
    'xinitrc',
    'xsession',
  ].flatMap(name => [`**/.${name}`, `**/${name}`]),
]

/** The shebang interpreters used when `shell.interpreters` is not set. */
export const DEFAULT_SHELL_INTERPRETERS = ['sh', 'bash']

/**
 * Builds the sole language the shell plugin registers. It claims files by glob, via
 * `isSupported`, and via shebang interpreter. prettier-plugin-sh's own entries are dropped,
 * because several of them describe formats that are not shell scripts, such as ignore
 * files, `.env` files, and tmux configuration.
 */
export function createShellLanguage(
  base: SupportLanguage,
  files: string[],
  interpreters: string[],
): SupportLanguage {
  const matches = createPathMatcher(files)
  return {
    ...base,
    extensions: [],
    filenames: [],
    interpreters,
    isSupported: ({ filepath }) => matches(filepath),
  }
}
