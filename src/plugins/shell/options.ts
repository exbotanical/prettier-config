/** The shell dialects that prettier-plugin-sh parses. */
export type ShellVariant = 'bash' | 'bats' | 'mksh' | 'posix' | 'zsh'

/** The numeric `variant` values prettier-plugin-sh expects, from sh-syntax's LangVariant. */
export const SHELL_VARIANTS: Record<ShellVariant, number> = {
  bash: 1,
  posix: 2,
  mksh: 4,
  bats: 8,
  zsh: 16,
}

/** Options for prettier-plugin-sh. */
export interface OptionsShell {
  /**
   * Glob patterns for the files formatted as shell. Setting this replaces the defaults.
   * @default ['**\/*.sh', '**\/*.bash', '**\/*.zsh', '**\/.bashrc', '**\/bashrc', '**\/.bash_profile', '**\/bash_profile', '**\/.bash_logout', '**\/bash_logout', '**\/.bash_aliases', '**\/bash_aliases', '**\/.bash_functions', '**\/bash_functions', '**\/.profile', '**\/profile', '**\/.xinitrc', '**\/xinitrc', '**\/.xsession', '**\/xsession']
   */
  files?: string[]

  /**
   * The shebang interpreters that mark a file as shell, such as `bash` in
   * `#!/usr/bin/env bash`. Setting this replaces the defaults.
   * @default ['sh', 'bash']
   */
  interpreters?: string[]

  /**
   * Ensures a space exists between function names and the following open parens e.g. `name () {` instead of
   * `name() {`. With `shopt -s extglob`, bash parses `name?()` as an extended glob, so
   * functions whose names end in `?`, `*`, `+`, `@`, or `!` need the space.
   * @default true
   */
  functionSpace?: boolean

  /**
   * The shell dialect the parser accepts. Files ending in `.zsh`, and files with a zsh
   * shebang, always use `zsh`.
   * @default 'bash'
   */
  variant?: ShellVariant

  /**
   * Keeps comments. With `false` the formatter deletes them.
   * @default true
   */
  keepComments?: boolean

  /**
   * Stops parsing at this word, at most 4 bytes long, and drops everything after it from
   * the output.
   */
  stopAt?: string

  /** The number of missing tokens the parser may skip, so an incomplete script formats. */
  recoverErrors?: number

  /**
   * Removes redundant syntax, such as `$` inside `$(( ))` and quotes around variables
   * inside `[[ ]]`.
   * @default false
   */
  simplify?: boolean

  /** The indentation width in spaces; `0` indents with tabs. Defaults to `tabWidth`. */
  indent?: number

  /**
   * Puts `&&`, `||`, and `|` at the start of a continued line instead of at the end.
   * @default true
   */
  binaryNextLine?: boolean

  /**
   * Indents the branches inside `case ... esac`.
   * @default true
   */
  switchCaseIndent?: boolean

  /**
   * Puts a space after redirection operators such as `>` and `<`.
   * @default true
   */
  spaceRedirects?: boolean

  /**
   * Prints the smallest equivalent script: removes comments other than the shebang,
   * indentation, and optional spaces.
   * @default false
   */
  minify?: boolean

  /**
   * Prints the script on one line where the syntax allows it.
   * @default false
   */
  singleLine?: boolean

  /**
   * Moves a function's opening `{` onto its own line.
   * @default false
   */
  functionNextLine?: boolean
}

/**
 * Converts the factory's shell options into the Prettier options prettier-plugin-sh reads:
 * the dialect name becomes its numeric value, `recoverErrors` becomes the string the
 * plugin requires, and `functionSpace` becomes this package's `shellFunctionSpace`
 * option. The file matching options configure the language and are intentionally omitted.
 */
export function toShellPrettierOptions({
  variant = 'bash',
  recoverErrors,
  functionSpace = true,
  files: _files,
  interpreters: _interpreters,
  ...rest
}: OptionsShell): Record<string, unknown> {
  return {
    ...rest,
    variant: SHELL_VARIANTS[variant],
    shellFunctionSpace: functionSpace,
    ...(recoverErrors === undefined ? {} : { recoverErrors: String(recoverErrors) }),
  }
}
