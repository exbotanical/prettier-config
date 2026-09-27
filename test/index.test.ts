import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'

import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import exbotanical, { PRETTIER_OPTIONS } from '../src'
import { PLUGIN_MAPPINGS, PLUGIN_NAMES } from '../src/plugins'

import type { OptionsPrettier } from '../src'

const REPO_DIR = process.cwd()
const INSTALLED_BY_REPO = [
  '@prettier/plugin-xml',
  'prettier-plugin-toml',
  'prettier-plugin-sh',
]

let dirWithIniPlugin = ''

beforeAll(async () => {
  dirWithIniPlugin = await fs.mkdtemp(path.join(os.tmpdir(), 'prettier-config-'))
  const packageDir = path.join(dirWithIniPlugin, 'node_modules', 'prettier-plugin-ini')
  await fs.mkdir(packageDir, { recursive: true })
  await fs.writeFile(
    path.join(packageDir, 'package.json'),
    JSON.stringify({ name: 'prettier-plugin-ini', main: 'index.js' }),
  )
  await fs.writeFile(path.join(packageDir, 'index.js'), 'module.exports = {}\n')
})

afterEach(() => {
  process.chdir(REPO_DIR)
})

afterAll(async () => {
  await fs.rm(dirWithIniPlugin, { recursive: true, force: true })
})

describe('exbotanical', () => {
  it.each<{ name: string; options: OptionsPrettier | undefined; expected: string[] }>([
    { name: 'no argument', options: undefined, expected: [] },
    { name: 'empty options', options: {}, expected: [] },
    { name: 'empty plugins', options: { plugins: {} }, expected: [] },
    {
      name: 'one explicit enable',
      options: { plugins: { shell: true } },
      expected: ['prettier-plugin-sh'],
    },
    {
      name: 'several explicit enables',
      options: { plugins: { xml: true, toml: true, shell: true } },
      expected: INSTALLED_BY_REPO,
    },
    {
      name: 'explicit enables mixed with disables',
      options: { plugins: { shell: true, toml: false } },
      expected: ['prettier-plugin-sh'],
    },
    {
      name: 'explicit disable only',
      options: { plugins: { shell: false } },
      expected: [],
    },
  ])('resolves plugins for $name', ({ options, expected }) => {
    const config = exbotanical(options)

    expect(config).toMatchObject(PRETTIER_OPTIONS)
    expect(config.plugins).toEqual(expected.map(name => pluginPath(name)))
  })

  it.each<{ name: string; cwd: () => string; included: string[]; excluded: string[] }>([
    {
      name: 'without the ini plugin installed',
      cwd: () => REPO_DIR,
      included: INSTALLED_BY_REPO,
      excluded: ['prettier-plugin-ini'],
    },
    {
      name: 'with the ini plugin installed',
      cwd: () => dirWithIniPlugin,
      included: ['prettier-plugin-ini'],
      excluded: [],
    },
  ])("'all' enables every resolvable plugin $name", ({ cwd, included, excluded }) => {
    process.chdir(cwd())

    const { plugins = [] } = exbotanical({ plugins: 'all' })

    expect(plugins).toEqual(
      expect.arrayContaining(included.map(name => pluginPath(name))),
    )
    expect(
      excluded.filter(name => plugins.some(plugin => isPluginPath(plugin, name))),
    ).toEqual([])
  })

  it('throws when an explicitly enabled plugin is not installed', () => {
    expect(() => exbotanical({ plugins: { ini: true } })).toThrow(Error)
  })

  it('lists every mapped plugin in PLUGIN_NAMES', () => {
    expect([...PLUGIN_NAMES].sort()).toEqual(Object.keys(PLUGIN_MAPPINGS).sort())
  })
})

function pluginPath(packageName: string): string {
  return expect.stringMatching(pluginPathPattern(packageName))
}

function isPluginPath(plugin: unknown, packageName: string): boolean {
  return typeof plugin === 'string' && pluginPathPattern(packageName).test(plugin)
}

/**
 * Matches a plugin entry given either as the bare package name or as a resolved path
 * inside that package's node_modules directory, on posix or win32.
 */
function pluginPathPattern(packageName: string): RegExp {
  const pathSegment = packageName.replace('/', String.raw`[\\/]`)
  return new RegExp(
    String.raw`^(?:${packageName}|.*[\\/]node_modules[\\/]${pathSegment}[\\/].*)$`,
  )
}
