import { createShellLanguage } from './languages'
import { variantFor } from './variant'

import type { Parser, Plugin, Printer } from 'prettier'

/**
 * Builds the shell plugin object from prettier-plugin-sh: one shell language that claims
 * the configured globs and interpreters, and the sh parser and printer, both called with
 * the zsh variant for zsh files. prettier-plugin-sh's Dockerfile parser and printer are
 * left out.
 */
export function createShellPlugin(
  sh: Plugin,
  files: string[],
  interpreters: string[],
): Plugin {
  const base = sh.languages?.find(language => language.name === 'Shell')
  const shParser = sh.parsers?.sh
  const shPrinter = sh.printers?.sh
  if (!base || !shParser || !shPrinter) {
    throw new Error(
      '@exbotanical/prettier-config: prettier-plugin-sh has no Shell language',
    )
  }

  const parser: Parser = {
    ...shParser,
    parse: async (text, options) =>
      shParser.parse(text, {
        ...options,
        variant: variantFor(options.filepath, text, options.variant),
      }),
  }

  const printer: Printer = {
    ...shPrinter,
    print: (path, options, print) =>
      shPrinter.print(
        path,
        {
          ...options,
          variant: variantFor(options.filepath, options.originalText, options.variant),
        },
        print,
      ),
  }

  return {
    languages: [createShellLanguage(base, files, interpreters)],
    options: sh.options,
    parsers: { sh: parser },
    printers: { sh: printer },
  }
}
