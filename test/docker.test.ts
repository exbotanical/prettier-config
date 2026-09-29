import { describe, expect, it } from 'vitest'

import { claims, format, languagesFor } from './utils'

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
  ])('claims files by $name', async ({ options, claimed, unclaimed }) => {
    const [language] = await languagesFor(options, 'dockerfile')
    if (!language) throw new Error('the Dockerfile language was expected but was missing')

    expect({
      claimed: claimed.filter(name => claims(language, name)),
      unclaimed: unclaimed.filter(name => !claims(language, name)),
    }).toEqual({ claimed, unclaimed })
  })

  it('registers no Dockerfile language when docker is disabled', async () => {
    await expect(languagesFor({ shell: true }, 'dockerfile')).rejects.toThrow(Error)
  })

  it.each<{ name: string; options: OptionsPrettier; expected: string }>([
    {
      name: 'the indent from tabWidth',
      options: { docker: true },
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n  && rm -rf /var/cache/apk/* >/dev/null\nCOPY . /app\n',
    },
    {
      name: 'the indent option',
      options: { docker: { indent: 4 } },
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n    && rm -rf /var/cache/apk/* >/dev/null\nCOPY . /app\n',
    },
    {
      name: 'the spaceRedirects option',
      options: { docker: { spaceRedirects: true } },
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n  && rm -rf /var/cache/apk/* > /dev/null\nCOPY . /app\n',
    },
    {
      name: 'the tabWidth indent when the shell plugin sets its own indent',
      options: { docker: true, shell: { indent: 8 } },
      expected:
        'FROM alpine:3\nRUN apk add curl \\\n  && rm -rf /var/cache/apk/* >/dev/null\nCOPY . /app\n',
    },
  ])('passes $name to dockerfmt', async ({ options, expected }) => {
    await expect(format(DOCKERFILE, 'Dockerfile', options)).resolves.toBe(expected)
  })
})
