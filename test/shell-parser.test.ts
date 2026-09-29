import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { promisify } from 'node:util'

import * as prettier from 'prettier'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import exbotanical from '../src'

const SOURCE = 'f() {\nif true;then echo  a &&\n  echo b;fi\n}\n'
const FORMATTED = 'f () {\n  if true; then echo a \\\n    && echo b; fi\n}\n'

let dir = ''

beforeAll(async () => {
  dir = await fs.mkdtemp(path.join(os.tmpdir(), 'prettier-config-parser-'))
  await fs.writeFile(
    path.join(dir, 'prettier.config.mjs'),
    [
      `import exbotanical from ${JSON.stringify(path.resolve('dist/index.js'))}`,
      'export default {',
      "  ...(await exbotanical({ shell: { files: ['**/*.sh', '**/*.run'] } })),",
      "  overrides: [{ files: ['wide.sh'], options: { indent: 4, binaryNextLine: false } }],",
      '}',
      '',
    ].join('\n'),
  )
  for (const name of ['a.sh', 'wide.sh', 'job.run']) {
    await fs.writeFile(path.join(dir, name), SOURCE)
  }
  await fs.writeFile(path.join(dir, 'bad.sh'), 'if true; then\n  echo (\nfi\n')
})

afterAll(async () => {
  await fs.rm(dir, { recursive: true, force: true })
})

describe('shell parser', () => {
  it.each<{ name: string; options: prettier.Options; expected: string }>([
    { name: 'no extra options', options: {}, expected: FORMATTED },
    {
      name: 'indent and binaryNextLine',
      options: { indent: 4, binaryNextLine: false },
      expected: 'f () {\n    if true; then echo a &&\n        echo b; fi\n}\n',
    },
  ])('passes $name to prettier-plugin-sh', async ({ options, expected }) => {
    const config = await exbotanical({ shell: true })

    await expect(
      prettier.format(SOURCE, { ...config, ...options, filepath: 'a.sh' }),
    ).resolves.toBe(expected)
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

  it.each<{
    name: string
    range: (source: string) => [number, number]
    formats: boolean
  }>([
    {
      name: 'a range that covers the file',
      range: source => [0, source.length],
      formats: true,
    },
    { name: 'a partial range', range: () => [0, 5], formats: false },
  ])('formats only with $name', async ({ range, formats }) => {
    const config = await exbotanical({ shell: true })
    const [rangeStart, rangeEnd] = range(SOURCE)

    const output = await prettier.format(SOURCE, {
      ...config,
      filepath: 'a.sh',
      rangeStart,
      rangeEnd,
    })

    expect(output).toBe(formats ? FORMATTED : SOURCE)
  })

  it.each<{ file: string; expected: string }>([
    { file: 'a.sh', expected: FORMATTED },
    {
      file: 'wide.sh',
      expected: 'f () {\n    if true; then echo a &&\n        echo b; fi\n}\n',
    },
    { file: 'job.run', expected: FORMATTED },
  ])('formats $file with the CLI, applying overrides', async ({ file, expected }) => {
    const { stdout } = await runPrettier([file])

    expect(stdout).toBe(expected)
  })

  it('reports a parse error with the file path', async () => {
    await expect(runPrettier(['bad.sh'])).rejects.toMatchObject({
      code: 2,
      stderr: expect.stringContaining('[error] bad.sh: Error:'),
    })
  })
})

async function runPrettier(args: string[]): Promise<{ stdout: string; stderr: string }> {
  return promisify(execFile)(
    process.execPath,
    [path.resolve('node_modules/prettier/bin/prettier.cjs'), ...args],
    { cwd: dir },
  )
}
