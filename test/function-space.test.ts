import * as prettier from 'prettier'
import { describe, expect, it } from 'vitest'

import exbotanical from '../src'

import type { OptionsPrettier } from '../src'

const SPACED: OptionsPrettier = { shell: true }
const UNSPACED: OptionsPrettier = { shell: { functionSpace: false } }

describe('shell function spacing', () => {
  it.each<{ name: string; input: string; expected: string }>([
    { name: 'a plain name', input: 'foo() {\n  :\n}\n', expected: 'foo () {\n  :\n}\n' },
    {
      name: 'a name ending in ?',
      input: 'utils::interactive?() {\n  :\n}\n',
      expected: 'utils::interactive? () {\n  :\n}\n',
    },
    {
      name: 'an already spaced name',
      input: 'dirty? () {\n  :\n}\n',
      expected: 'dirty? () {\n  :\n}\n',
    },
    {
      name: 'the function keyword with parens',
      input: 'function bar() {\n  :\n}\n',
      expected: 'function bar () {\n  :\n}\n',
    },
    {
      name: 'the function keyword without parens',
      input: 'function baz {\n  :\n}\n',
      expected: 'function baz {\n  :\n}\n',
    },
    {
      name: 'nested functions',
      input: 'outer() {\n  inner() {\n    :\n  }\n}\n',
      expected: 'outer () {\n  inner () {\n    :\n  }\n}\n',
    },
    {
      name: 'a function in a command substitution',
      input: 'x=$(\n  f() { :; }\n  f\n)\n',
      expected: 'x=$(\n  f () { :; }\n  f\n)\n',
    },
    {
      name: 'a function in a subshell',
      input: '(s() { :; })\n',
      expected: '(s () { :; })\n',
    },
    {
      name: 'a string containing ?()',
      input: 'echo "x?() y"\n',
      expected: 'echo "x?() y"\n',
    },
    {
      name: 'a comment containing ?()',
      input: '# foo?() {\n:\n',
      expected: '# foo?() {\n:\n',
    },
    {
      name: 'a heredoc containing a definition',
      input: 'cat << EOF\nh() {\nEOF\n',
      expected: 'cat << EOF\nh() {\nEOF\n',
    },
  ])('formats $name', async ({ input, expected }) => {
    await expect(format(input, SPACED)).resolves.toBe(expected)
  })

  it.each([
    'foo() {\n  :\n}\n',
    'utils::interactive?() {\n  :\n}\n',
    'function bar() { :; }\nfunction baz { :; }\n',
    'outer() {\n  inner() { :; }\n}\n',
  ])('is idempotent on a second pass over %j', async input => {
    const once = await format(input, SPACED)

    await expect(format(once, SPACED)).resolves.toBe(once)
  })

  it.each<{ name: string; options: OptionsPrettier; expected: string }>([
    { name: 'spacing by default', options: SPACED, expected: 'foo () {\n  :\n}\n' },
    {
      name: 'shfmt output with functionSpace false',
      options: UNSPACED,
      expected: 'foo() {\n  :\n}\n',
    },
  ])('prints $name', async ({ options, expected }) => {
    await expect(format('foo() {\n  :\n}\n', options)).resolves.toBe(expected)
  })
})

async function format(input: string, options: OptionsPrettier): Promise<string> {
  const config = await exbotanical(options)
  return prettier.format(input, { ...config, filepath: 'sample.bash' })
}
