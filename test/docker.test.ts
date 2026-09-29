import * as prettier from 'prettier'
import { describe, expect, it } from 'vitest'

import exbotanical from '../src'

import type { OptionsPrettier } from '../src'

const DOCKERFILE =
  'from alpine:3\nrun apk add   curl && \\\n  rm -rf /var/cache/apk/* >/dev/null\ncopy . /app\n'

describe('docker', () => {
  it.each<{
    name: string
    options: OptionsPrettier
    claimed: string[]
    unclaimed: string[]
  }>([
    {
      name: 'the default globs',
      options: { docker: true },
      claimed: [
        'Dockerfile',
        'Containerfile',
        'app.dockerfile',
        'app.containerfile',
        'Dockerfile.dev',
        'x/y/Dockerfile',
      ],
      unclaimed: ['MyDockerfile', 'a.sh', 'dockerfile.txt/other'],
    },
    {
      name: 'custom globs',
      options: { docker: { files: ['**/*.docker'] } },
      claimed: ['app.docker'],
      unclaimed: ['Dockerfile', 'Dockerfile.dev'],
    },
    {
      name: 'docker disabled',
      options: { shell: true },
      claimed: [],
      unclaimed: ['Dockerfile'],
    },
  ])('claims files by $name', async ({ options, claimed, unclaimed }) => {
    const { plugins } = await exbotanical(options)
    const parserOf = async (name: string) => {
      const info = await prettier.getFileInfo(name, { plugins })
      return info.inferredParser
    }

    await expect(Promise.all(claimed.map(async name => parserOf(name)))).resolves.toEqual(
      claimed.map(() => 'dockerfile'),
    )
    await expect(
      Promise.all(unclaimed.map(async name => parserOf(name))),
    ).resolves.toEqual(unclaimed.map(() => null))
  })

  it.each<{ name: string; options: OptionsPrettier; file: string; expected: string }>([
    {
      name: 'the defaults',
      options: { docker: true },
      file: 'Dockerfile',
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n  && rm -rf /var/cache/apk/* >/dev/null\nCOPY . /app\n',
    },
    {
      name: 'a Dockerfile.* name',
      options: { docker: true },
      file: 'Dockerfile.dev',
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n  && rm -rf /var/cache/apk/* >/dev/null\nCOPY . /app\n',
    },
    {
      name: 'indent',
      options: { docker: { indent: 4 } },
      file: 'Dockerfile',
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n    && rm -rf /var/cache/apk/* >/dev/null\nCOPY . /app\n',
    },
    {
      name: 'spaceRedirects',
      options: { docker: { spaceRedirects: true } },
      file: 'Dockerfile',
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n  && rm -rf /var/cache/apk/* > /dev/null\nCOPY . /app\n',
    },
    {
      name: 'the shell plugin also enabled with its own indent',
      options: { docker: true, shell: { indent: 8 } },
      file: 'Dockerfile',
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n  && rm -rf /var/cache/apk/* >/dev/null\nCOPY . /app\n',
    },
  ])('formats with $name', async ({ options, file, expected }) => {
    const config = await exbotanical(options)

    await expect(
      prettier.format(DOCKERFILE, { ...config, filepath: file }),
    ).resolves.toBe(expected)
  })
})
