import * as prettier from 'prettier'
import { describe, expect, it } from 'vitest'

import exbotanical from '../src'
import { loadPlugin } from '../src/resolve'

import type { OptionsPrettier } from '../src'

describe('exbotanical', () => {
  it.each<{
    name: string
    options: OptionsPrettier
    file: string
    input: string
    expected: string
  }>([
    {
      name: 'xml',
      options: { xml: true },
      file: 'a.xml',
      input: '<a><b/></a>\n',
      expected: '<a><b /></a>\n',
    },
    {
      name: 'shell',
      options: { shell: true },
      file: 'a.sh',
      input: 'if true;then echo  hi;fi\n',
      expected: 'if true; then echo hi; fi\n',
    },
    {
      name: 'toml, with indentTableKeyValuePairs on by default',
      options: { toml: true },
      file: 'a.toml',
      input: '[server]\nhost="x"\n',
      expected: "[server]\n  host = 'x'\n",
    },
    {
      name: 'ini',
      options: { ini: true },
      file: 'a.ini',
      input: '[s]\na  =  1\n',
      expected: '[s]\na=1\n',
    },
    {
      name: 'properties',
      options: { properties: true },
      file: 'a.properties',
      input: 'a=1\n',
      expected: 'a = 1\n',
    },
    {
      name: 'nginx',
      options: { nginx: true },
      file: 'a.nginx',
      input: 'server{listen 80;}\n',
      expected: 'server {\n    listen 80;\n}\n',
    },
    {
      name: 'sql',
      options: { sql: true },
      file: 'a.sql',
      input: 'select a from t\n',
      expected: 'select\n  a\nfrom\n  t\n',
    },
    {
      name: 'solidity',
      options: { solidity: true },
      file: 'a.sol',
      input: 'contract A{uint x=1;}\n',
      expected: 'contract A {\n    uint x = 1;\n}\n',
    },
  ])('formats with $name enabled', async ({ options, file, input, expected }) => {
    await expect(format(input, file, options)).resolves.toBe(expected)
  })

  it.each<{
    name: string
    options: OptionsPrettier
    file: string
    input: string
    expected: string
  }>([
    {
      name: 'an xml option',
      options: { xml: { xmlSelfClosingSpace: false } },
      file: 'a.xml',
      input: '<a><b /></a>\n',
      expected: '<a><b/></a>\n',
    },
    {
      name: 'a toml default turned off',
      options: { toml: { indentTableKeyValuePairs: false } },
      file: 'a.toml',
      input: '[server]\nhost="x"\n',
      expected: "[server]\nhost = 'x'\n",
    },
    {
      name: 'a shell option',
      options: { shell: { binaryNextLine: false } },
      file: 'a.sh',
      input: 'build && \\\n  deploy\n',
      expected: 'build &&\n  deploy\n',
    },
    {
      name: 'the shell variant name',
      options: { shell: { variant: 'bats' } },
      file: 'a.sh',
      input: '@test "x" {\n  run  true\n}\n',
      expected: '@test "x" {\n  run true\n}\n',
    },
    {
      name: 'recoverErrors given as a number',
      options: { shell: { recoverErrors: 1 } },
      file: 'a.sh',
      input: 'echo   ok |\n',
      expected: 'echo ok |\n',
    },
    {
      name: 'a core option',
      options: { core: { semi: true } },
      file: 'a.js',
      input: 'const a = 1\n',
      expected: 'const a = 1;\n',
    },
    {
      name: 'the core defaults',
      options: {},
      file: 'a.js',
      input: 'const a = { "b": 1, "c-d": 2 };\n',
      expected: "const a = { 'b': 1, 'c-d': 2 }\n",
    },
  ])('applies $name', async ({ options, file, input, expected }) => {
    await expect(format(input, file, options)).resolves.toBe(expected)
  })

  it.each<{
    name: string
    options: OptionsPrettier
    file: string
    expected: null | string
  }>([
    { name: 'no plugin enabled', options: {}, file: 'a.toml', expected: null },
    { name: 'toml disabled', options: { toml: false }, file: 'a.toml', expected: null },
    {
      name: 'properties with ini also enabled',
      options: { ini: true, properties: true },
      file: 'a.properties',
      expected: 'dot-properties',
    },
  ])('infers the parser with $name', async ({ options, file, expected }) => {
    const { plugins } = await exbotanical(options)
    const { inferredParser } = await prettier.getFileInfo(file, { plugins })

    expect(inferredParser).toBe(expected)
  })

  it('throws when a plugin package is not installed', async () => {
    await expect(loadPlugin('prettier-plugin-not-installed')).rejects.toThrow(Error)
  })
})

async function format(
  input: string,
  filepath: string,
  options: OptionsPrettier,
): Promise<string> {
  return prettier.format(input, { ...(await exbotanical(options)), filepath })
}
