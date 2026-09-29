import { format } from 'prettier'

import {
  FORMATTED_AST_FORMAT,
  FORMATTED_PRINTER,
  formattedNode,
  locEnd,
  locStart,
} from '../../formatted-node'

import { spaceFunctionNames } from './function-space'
import { createShellLanguage } from './languages'
import { variantFor } from './variant'

import type { FormattedNode } from '../../formatted-node'
import type {
  BooleanSupportOption,
  Options,
  Parser,
  ParserOptions,
  Plugin,
} from 'prettier'

const SHELL_FUNCTION_SPACE_OPTION: BooleanSupportOption = {
  category: 'Format',
  type: 'boolean',
  default: true,
  description: 'Print shell function definitions as `name () {` instead of `name() {`.',
}

/** The core options prettier-plugin-sh reads when it prints. */
const CORE_OPTIONS: string[] = ['tabWidth', 'useTabs', 'printWidth', 'endOfLine']

/**
 * Builds the shell plugin object: one shell language that claims the configured globs and
 * interpreters, and a parser that formats the file.
 */
export function createShellPlugin(
  sh: Plugin,
  files: string[],
  interpreters: string[],
): Plugin {
  const base = sh.languages?.find(language => language.name === 'Shell')
  const shParser = sh.parsers?.sh
  if (!base || !shParser) {
    throw new Error(
      '@exbotanical/prettier-config: prettier-plugin-sh has no Shell language',
    )
  }

  const parser: Parser<FormattedNode> = {
    astFormat: FORMATTED_AST_FORMAT,
    hasPragma: shParser.hasPragma,
    locStart,
    locEnd,
    parse: async (text, options) => {
      const formatted = await format(text, innerFormatOptions(sh, text, options))
      const output =
        options.shellFunctionSpace === false
          ? formatted
          : await spaceFunctionNames(formatted)
      return formattedNode(output, text)
    },
  }

  return {
    languages: [createShellLanguage(base, files, interpreters)],
    options: { ...sh.options, shellFunctionSpace: SHELL_FUNCTION_SPACE_OPTION },
    parsers: { sh: parser },
    printers: { [FORMATTED_AST_FORMAT]: FORMATTED_PRINTER },
  }
}

/**
 * Returns the options for the inner delegate prettier call.
 */
function innerFormatOptions(
  sh: Plugin,
  text: string,
  options: ParserOptions<FormattedNode>,
): Options {
  const names = [...CORE_OPTIONS, ...Object.keys(sh.options ?? {})]
  const resolved = Object.fromEntries(
    names.flatMap(name => (options[name] === undefined ? [] : [[name, options[name]]])),
  )
  return {
    ...resolved,
    variant: variantFor(options.filepath, text, options.variant),
    filepath: options.filepath,
    parser: 'sh',
    plugins: [sh],
  }
}
