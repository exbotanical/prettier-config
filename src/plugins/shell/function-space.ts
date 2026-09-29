import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

import { Language, Parser } from 'web-tree-sitter'

let bashParser: Promise<Parser> | undefined

/**
 * Inserts a space between each function name and its `()`, such that shfmt's `name() {`
 * prints as `name () {`. With `shopt -s extglob`, bash parses `name?()` as an extended
 * glob, so names ending in `?`, `*`, `+`, `@`, or `!` need the space to stay function
 * definitions. Edits use syntax tree positions, so strings, comments, and heredocs are
 * untouched, and `function name {` retains its form.
 */
export async function spaceFunctionNames(text: string): Promise<string> {
  bashParser ??= createBashParser()
  const parser = await bashParser
  const tree = parser.parse(text)
  if (!tree) return text

  const insertAt = tree.rootNode
    .descendantsOfType('function_definition')
    .map(node => node?.childForFieldName('name'))
    .filter(
      name =>
        name?.nextSibling?.type === '(' && name.nextSibling.startIndex === name.endIndex,
    )
    .flatMap(name => (name ? [name.endIndex] : []))
    .sort((a, b) => b - a)
  tree.delete()

  let result = text
  for (const index of insertAt) {
    result = `${result.slice(0, index)} ${result.slice(index)}`
  }
  return result
}

async function createBashParser(): Promise<Parser> {
  await Parser.init()
  const parser = new Parser()
  parser.setLanguage(await Language.load(await readFile(bashGrammarPath())))
  return parser
}

/**
 * Given tree-sitter-bash is 20MB and runs a native install script (whereas this package requires only its 1.4MB WASM grammar), we copy tree-sitter-bash.wasm next to this module.
 * When the copy is absent (e.g. in tests that run the TypeScript sources), the grammar is read via the devDependency.
 */
function bashGrammarPath(): string {
  const copied = fileURLToPath(new URL('tree-sitter-bash.wasm', import.meta.url))
  if (existsSync(copied)) return copied

  return createRequire(import.meta.url).resolve('tree-sitter-bash/tree-sitter-bash.wasm')
}
