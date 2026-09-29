import { SHELL_VARIANTS } from './options'

const ZSH_SHEBANG = /^#!.*[\s/]zsh(?:\s|$)/

/**
 * Returns the sh-syntax variant for one file: zsh for files ending in `.zsh` or starting
 * with a zsh shebang, such as `#!/bin/zsh` or `#!/usr/bin/env zsh`, and the configured
 * variant for every other file.
 */
export function variantFor(
  filepath: string | undefined,
  text: string,
  configured: unknown,
): unknown {
  const [firstLine = ''] = text.split('\n', 1)
  const isZsh = Boolean(filepath?.endsWith('.zsh')) || ZSH_SHEBANG.test(firstLine)
  return isZsh ? SHELL_VARIANTS.zsh : configured
}
