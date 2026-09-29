import { describe, expect, it } from 'vitest'

import exbotanical from '../src'
import { PRETTIER_OPTIONS } from '../src/core'
import { loadPlugin } from '../src/resolve'

import { pluginsFor } from './utils'

import type { OptionsPrettier } from '../src'

describe('exbotanical', () => {
  it.each<{ key: keyof OptionsPrettier; packageName: string }>([
    { key: 'xml', packageName: '@prettier/plugin-xml' },
    { key: 'toml', packageName: 'prettier-plugin-toml' },
    { key: 'ini', packageName: 'prettier-plugin-ini' },
    { key: 'properties', packageName: 'prettier-plugin-properties' },
    { key: 'nginx', packageName: 'prettier-plugin-nginx' },
    { key: 'sql', packageName: 'prettier-plugin-sql' },
    { key: 'solidity', packageName: 'prettier-plugin-solidity' },
  ])('adds $packageName when $key is enabled', async ({ key, packageName }) => {
    const plugins = await pluginsFor({ [key]: true })

    expect(plugins).toEqual([await loadPlugin(packageName)])
  })

  it.each<{ name: string; options: OptionsPrettier }>([
    { name: 'no plugin is enabled', options: {} },
    { name: 'a plugin is set to false', options: { toml: false } },
  ])('adds no plugins when $name', async ({ options }) => {
    await expect(pluginsFor(options)).resolves.toEqual([])
  })

  it('orders prettier-plugin-properties after prettier-plugin-ini', async () => {
    const plugins = await pluginsFor({ properties: true, ini: true })

    expect(plugins).toEqual([
      await loadPlugin('prettier-plugin-ini'),
      await loadPlugin('prettier-plugin-properties'),
    ])
  })

  it.each<{ name: string; options: OptionsPrettier; expected: Record<string, unknown> }>([
    { name: 'the core defaults', options: {}, expected: { ...PRETTIER_OPTIONS } },
    {
      name: 'a core option',
      options: { core: { semi: true } },
      expected: { semi: true },
    },
    {
      name: 'a plugin option',
      options: { xml: { xmlSelfClosingSpace: false } },
      expected: { xmlSelfClosingSpace: false },
    },
    {
      name: 'a plugin default',
      options: { toml: true },
      expected: { indentTableKeyValuePairs: true },
    },
    {
      name: 'a plugin default turned off',
      options: { toml: { indentTableKeyValuePairs: false } },
      expected: { indentTableKeyValuePairs: false },
    },
    {
      name: 'the shell defaults',
      options: { shell: true },
      expected: { variant: 1, shellFunctionSpace: true },
    },
    {
      name: 'a shell variant name as its number',
      options: { shell: { variant: 'bats' } },
      expected: { variant: 8 },
    },
    {
      name: 'recoverErrors as a string',
      options: { shell: { recoverErrors: 1 } },
      expected: { recoverErrors: '1' },
    },
    {
      name: 'functionSpace as shellFunctionSpace',
      options: { shell: { functionSpace: false } },
      expected: { shellFunctionSpace: false },
    },
    {
      name: 'the docker defaults',
      options: { docker: true },
      expected: { dockerSpaceRedirects: false },
    },
    {
      name: 'the docker options under their prefixed names',
      options: { docker: { indent: 4, spaceRedirects: true } },
      expected: { dockerIndent: 4, dockerSpaceRedirects: true },
    },
  ])('sets $name in the config', async ({ options, expected }) => {
    await expect(exbotanical(options)).resolves.toMatchObject(expected)
  })

  it('throws when a plugin package is not installed', async () => {
    await expect(loadPlugin('prettier-plugin-not-installed')).rejects.toThrow(Error)
  })
})
