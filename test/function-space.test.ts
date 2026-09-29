import { describe, expect, it } from 'vitest'

import { spaceFunctionNames } from '../src/plugins/shell/function-space'

import { format } from './utils'

import type { OptionsPrettier } from '../src'

describe('spaceFunctionNames', () => {
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
  ])('spaces $name', async ({ input, expected }) => {
    await expect(spaceFunctionNames(input)).resolves.toBe(expected)
  })

  it.each([
    'foo() {\n  :\n}\n',
    'utils::interactive?() {\n  :\n}\n',
    'function bar() { :; }\nfunction baz { :; }\n',
    'outer() {\n  inner() { :; }\n}\n',
  ])('is idempotent on a second pass over %j', async input => {
    const once = await spaceFunctionNames(input)

    await expect(spaceFunctionNames(once)).resolves.toBe(once)
  })
})

describe('shell functionSpace', () => {
  it.each<{ name: string; options: OptionsPrettier; expected: string }>([
    {
      name: 'spaces names by default',
      options: { shell: true },
      expected: 'foo () {\n  :\n}\n',
    },
    {
      name: 'keeps the shfmt output with functionSpace false',
      options: { shell: { functionSpace: false } },
      expected: 'foo() {\n  :\n}\n',
    },
  ])('$name', async ({ options, expected }) => {
    await expect(format('foo() {\n  :\n}\n', 'a.bash', options)).resolves.toBe(expected)
  })
})
