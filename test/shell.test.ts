import * as prettier from 'prettier'
import { describe, expect, it } from 'vitest'

import exbotanical from '../src'
import { SHELL_VARIANTS } from '../src/plugins/shell/options'
import { variantFor } from '../src/plugins/shell/variant'

import { claims, format, languagesFor } from './utils'

import type { OptionsPrettier } from '../src'

describe('shell languages', () => {
  it('registers one language for the sh parser', async () => {
    const languages = await languagesFor({ shell: true }, 'sh')

    expect(languages.map(language => language.parsers)).toEqual([['sh']])
  })

  it.each<{
    name: string
    options: OptionsPrettier
    claimed: string[]
    unclaimed: string[]
  }>([
    {
      name: 'the default globs',
      options: { shell: true },
      claimed: [
        'a.sh',
        'x/y/a.bash',
        'a.zsh',
        '.bashrc',
        'bashrc',
        '/home/u/.profile',
        'nested/dir/.xsession',
        String.raw`C:\Users\u\a.sh`,
      ],
      unclaimed: [
        'a.run',
        '.gitignore',
        '.env',
        '.tmux.conf',
        'Dockerfile',
        'a.bats',
        'a.ksh',
      ],
    },
    {
      name: 'custom globs',
      options: { shell: { files: ['**/*.run'] } },
      claimed: ['a.run', '/tmp/x/job.run'],
      unclaimed: ['a.sh', '.bashrc'],
    },
  ])('claims files by $name', async ({ options, claimed, unclaimed }) => {
    const [language] = await languagesFor(options, 'sh')
    if (!language) throw new Error('the shell language was expected but was missing')

    expect({
      claimed: claimed.filter(name => claims(language, name)),
      unclaimed: unclaimed.filter(name => !claims(language, name)),
    }).toEqual({ claimed, unclaimed })
  })

  it.each<{ name: string; options: OptionsPrettier; expected: string[] }>([
    {
      name: 'the default interpreters',
      options: { shell: true },
      expected: ['sh', 'bash'],
    },
    {
      name: 'custom interpreters',
      options: { shell: { interpreters: ['zsh'] } },
      expected: ['zsh'],
    },
  ])('registers $name', async ({ options, expected }) => {
    const [language] = await languagesFor(options, 'sh')

    expect(language?.interpreters).toEqual(expected)
  })
})

describe('variantFor', () => {
  it.each<{ name: string; filepath?: string; text: string; expected: unknown }>([
    { name: 'a .zsh file', filepath: 'a.zsh', text: 'echo hi\n', expected: 16 },
    {
      name: 'an env zsh shebang',
      filepath: 'run',
      text: '#!/usr/bin/env zsh\necho hi\n',
      expected: 16,
    },
    { name: 'a zsh path shebang', filepath: 'run', text: '#!/bin/zsh\n', expected: 16 },
    { name: 'a .sh file', filepath: 'a.sh', text: 'echo hi\n', expected: 1 },
    {
      name: 'a shebang naming another program',
      filepath: 'run',
      text: '#!/usr/bin/env zshx\n',
      expected: 1,
    },
    { name: 'no file path', text: 'echo hi\n', expected: 1 },
  ])('returns the variant for $name', ({ filepath, text, expected }) => {
    expect(variantFor(filepath, text, SHELL_VARIANTS.bash)).toBe(expected)
  })
})

describe('shell parser', () => {
  const SOURCE = 'f() {\nif true;then echo  a &&\n  echo b;fi\n}\n'

  it('passes resolved options to prettier-plugin-sh', async () => {
    await expect(
      format(SOURCE, 'a.sh', { shell: true }, { indent: 4, binaryNextLine: false }),
    ).resolves.toBe('f () {\n    if true; then echo a &&\n        echo b; fi\n}\n')
  })

  it('selects the zsh variant for .zsh files', async () => {
    const zshOnly = `print -r -- \${(j:,:)arr}\n`

    await expect(format(zshOnly, 'a.zsh', { shell: true })).resolves.toBe(zshOnly)
  })

  it('maps the cursor to the same token', async () => {
    const config = await exbotanical({ shell: true })
    const source = 'f() {\nif true;then echo  a;fi\n}\n'

    const { formatted, cursorOffset } = await prettier.formatWithCursor(source, {
      ...config,
      filepath: 'a.sh',
      cursorOffset: source.indexOf('echo'),
    })

    expect(formatted.slice(cursorOffset, cursorOffset + 4)).toBe('echo')
  })
})
