import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { promisify } from 'node:util'

import * as prettier from 'prettier'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import exbotanical from '../src'

import type { OptionsPrettier } from '../src'

const FILES: Record<string, string> = {
  'a.sh': 'echo hi\n',
  'a.bash': 'echo hi\n',
  'a.zsh': 'echo hi\n',
  '.bashrc': 'echo hi\n',
  'bashrc': 'echo hi\n',
  '.profile': 'echo hi\n',
  'nested/dir/.xsession': 'echo hi\n',
  'bin-bash': '#!/bin/bash\necho hi\n',
  'env-sh': '#!/usr/bin/env sh\necho hi\n',
  'env-zsh': '#!/usr/bin/env zsh\necho hi\n',
  'a.run': 'echo hi\n',
  '.gitignore': 'node_modules  \n  leading\n',
  '.env': 'A=1\n',
  '.tmux.conf': 'set -g mouse on\n',
  'Dockerfile': 'FROM alpine\n',
  'a.bats': '@test "x" {\n  run true\n}\n',
  'a.ksh': 'echo hi\n',
}

let dir = ''

beforeAll(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'prettier-config-shell-'))
  for (const [name, content] of Object.entries(FILES)) {
    await fs.mkdir(path.dirname(path.join(dir, name)), { recursive: true })
    await fs.writeFile(path.join(dir, name), content)
  }
})

afterAll(async () => {
  await fs.rm(dir, { recursive: true, force: true })
})

describe('shell file matching', () => {
  it.each<{
    name: string
    options: OptionsPrettier
    claimed: string[]
    unclaimed: string[]
  }>([
    {
      name: 'the default globs and interpreters',
      options: { shell: true },
      claimed: [
        'a.sh',
        'a.bash',
        'a.zsh',
        '.bashrc',
        'bashrc',
        '.profile',
        'nested/dir/.xsession',
        'bin-bash',
        'env-sh',
      ],
      unclaimed: [
        'env-zsh',
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
      name: 'custom globs and interpreters',
      options: { shell: { files: ['**/*.run'], interpreters: ['zsh'] } },
      claimed: ['a.run', 'env-zsh'],
      unclaimed: ['a.sh', '.bashrc', 'bin-bash', 'env-sh', '.gitignore'],
    },
  ])('claims files by $name', async ({ options, claimed, unclaimed }) => {
    const { plugins } = await exbotanical(options)
    const parserOf = async (name: string) => {
      const info = await prettier.getFileInfo(path.join(dir, name), { plugins })
      return info.inferredParser
    }

    await expect(Promise.all(claimed.map(async name => parserOf(name)))).resolves.toEqual(
      claimed.map(() => 'sh'),
    )
    await expect(
      Promise.all(unclaimed.map(async name => parserOf(name))),
    ).resolves.toEqual(unclaimed.map(() => null))
  })
})

describe('shell variant', () => {
  const ZSH_ONLY = `print -r -- \${(j:,:)arr}\n`

  it.each<{
    name: string
    options: OptionsPrettier
    filepath: string
    input: string
    expected: string
  }>([
    {
      name: 'a .zsh file',
      options: { shell: true },
      filepath: 'a.zsh',
      input: ZSH_ONLY,
      expected: ZSH_ONLY,
    },
    {
      name: 'a zsh shebang',
      options: { shell: { interpreters: ['zsh'] } },
      filepath: 'env-zsh',
      input: `#!/usr/bin/env zsh\n${ZSH_ONLY}`,
      expected: `#!/usr/bin/env zsh\n${ZSH_ONLY}`,
    },
    {
      name: 'a .zsh file when the configured variant is posix',
      options: { shell: { variant: 'posix' } },
      filepath: 'a.zsh',
      input: ZSH_ONLY,
      expected: ZSH_ONLY,
    },
  ])('parses zsh syntax in $name', async ({ options, filepath, input, expected }) => {
    await expect(format(input, filepath, options)).resolves.toBe(expected)
  })

  it.each<{ name: string; options: OptionsPrettier; filepath: string; input: string }>([
    {
      name: 'zsh syntax in a .sh file',
      options: { shell: true },
      filepath: 'a.sh',
      input: ZSH_ONLY,
    },
    {
      name: 'a bash array with the posix variant',
      options: { shell: { variant: 'posix' } },
      filepath: 'a.sh',
      input: `echo "\${arr[0]}"\n`,
    },
  ])('rejects $name', async ({ options, filepath, input }) => {
    await expect(format(input, filepath, options)).rejects.toThrow(Error)
  })
})

describe('shell with the prettier CLI', () => {
  it('skips unclaimed files silently with --ignore-unknown', async () => {
    const configPath = path.join(dir, 'prettier.config.mjs')
    await fs.writeFile(
      configPath,
      `import exbotanical from ${JSON.stringify(path.resolve('dist/index.js'))}\nexport default await exbotanical({ shell: true })\n`,
    )

    const { stdout, stderr } = await promisify(execFile)(
      process.execPath,
      [
        path.resolve('node_modules/prettier/bin/prettier.cjs'),
        '--check',
        '--ignore-unknown',
        '.gitignore',
        '.env',
        '.tmux.conf',
        'Dockerfile',
        'a.sh',
      ],
      { cwd: dir },
    )

    expect({ stdout: stdout.trim(), stderr }).toEqual({
      stdout: 'Checking formatting...\nAll matched files use Prettier code style!',
      stderr: '',
    })
  })
})

/**
 * Formats `input` as the file `name` in the temporary directory. Prettier reads a file's
 * shebang from disk, so shebang cases name a file that exists there.
 */
async function format(
  input: string,
  name: string,
  options: OptionsPrettier,
): Promise<string> {
  const config = await exbotanical(options)
  return prettier.format(input, { ...config, filepath: path.join(dir, name) })
}
