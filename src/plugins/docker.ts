import {
  FORMATTED_AST_FORMAT,
  FORMATTED_PRINTER,
  formattedNode,
  locEnd,
  locStart,
} from '../formatted-node'
import { createPathMatcher } from '../globs'
import { definePlugin } from '../plugin-definition'
import { importFrom, resolvePackagePath } from '../resolve'

import type { FormattedNode } from '../formatted-node'
import type { BooleanSupportOption, IntSupportOption, Parser, Plugin } from 'prettier'

/** Options for Dockerfile formatting. */
export interface OptionsDocker {
  /**
   * Glob patterns for the files formatted as Dockerfiles. Setting this replaces the
   * defaults.
   * @default ['**\/Dockerfile', '**\/Containerfile', '**\/*.dockerfile', '**\/*.containerfile', '**\/Dockerfile.*']
   */
  files?: string[]

  /** The indentation width of continuation lines. Defaults to `tabWidth`, or 0 with `useTabs`. */
  indent?: number

  /**
   * Puts a space after redirection operators such as `>` and `<` in `RUN` commands.
   * @default false
   */
  spaceRedirects?: boolean
}

/** The Dockerfile globs used when `docker.files` is not set. */
export const DEFAULT_DOCKER_FILES = [
  '**/Dockerfile',
  '**/Containerfile',
  '**/*.dockerfile',
  '**/*.containerfile',
  '**/Dockerfile.*',
]

interface Dockerfmt {
  formatDockerfileContents: (
    contents: string,
    options: { indent: number; trailingNewline: boolean; spaceRedirects: boolean },
  ) => Promise<string>
}

const DOCKER_INDENT_OPTION: IntSupportOption = {
  category: 'Format',
  type: 'int',
  description: 'Indentation width of Dockerfile continuation lines.',
}

const DOCKER_SPACE_REDIRECTS_OPTION: BooleanSupportOption = {
  category: 'Format',
  type: 'boolean',
  default: false,
  description: 'Put a space after redirection operators in Dockerfile RUN commands.',
}

/**
 * Formats Dockerfiles with @reteps/dockerfmt, the formatter bundled with
 * prettier-plugin-sh. It calls dockerfmt directly:
 * prettier-plugin-sh's own Dockerfile printer falls back to formatting the file as a shell
 * script when dockerfmt fails, and this parser reports the error instead.
 */
async function createDockerPlugin(sh: Plugin, files: string[]): Promise<Plugin> {
  const base = sh.languages?.find(language => language.name === 'Dockerfile')
  const shPath = resolvePackagePath('prettier-plugin-sh')
  if (!base || !shPath) {
    throw new Error(
      '@exbotanical/prettier-config: prettier-plugin-sh has no Dockerfile language',
    )
  }

  const { formatDockerfileContents } = await importFrom<Dockerfmt>(
    '@reteps/dockerfmt',
    shPath,
  )
  const matches = createPathMatcher(files)

  const parser: Parser<FormattedNode> = {
    astFormat: FORMATTED_AST_FORMAT,
    locStart,
    locEnd,
    parse: async (text, options) => {
      const formatted: unknown = await formatDockerfileContents(text, {
        indent: dockerIndent(options),
        trailingNewline: true,
        spaceRedirects: options.dockerSpaceRedirects === true,
      })
      // Dockerfmt resolves to undefined (instead of rejecting) when its Go runtime fails.
      if (typeof formatted !== 'string') {
        throw new TypeError(`@reteps/dockerfmt could not format ${options.filepath}`)
      }
      return formattedNode(formatted, text)
    },
  }

  return {
    languages: [
      {
        ...base,
        extensions: [],
        filenames: [],
        isSupported: ({ filepath }) => matches(filepath),
      },
    ],
    options: {
      dockerIndent: DOCKER_INDENT_OPTION,
      dockerSpaceRedirects: DOCKER_SPACE_REDIRECTS_OPTION,
    },
    parsers: { dockerfile: parser },
    printers: { [FORMATTED_AST_FORMAT]: FORMATTED_PRINTER },
  }
}

function dockerIndent(options: {
  dockerIndent?: unknown
  useTabs?: boolean
  tabWidth: number
}): number {
  if (typeof options.dockerIndent === 'number') return options.dockerIndent
  return options.useTabs ? 0 : options.tabWidth
}

export const docker = definePlugin({
  key: 'docker',
  packageName: 'prettier-plugin-sh',
  defaults: { files: DEFAULT_DOCKER_FILES, spaceRedirects: false },
  configure: async (
    loaded,
    { files = DEFAULT_DOCKER_FILES, indent, spaceRedirects },
  ) => ({
    plugin: await createDockerPlugin(loaded, files),
    options: {
      ...(indent === undefined ? {} : { dockerIndent: indent }),
      dockerSpaceRedirects: spaceRedirects,
    },
  }),
})
