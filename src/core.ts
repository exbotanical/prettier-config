import type { Options } from 'prettier'

/**
 * The Prettier core options this config sets. Set via the `core` factory option.
 */
export const PRETTIER_OPTIONS: Options = {
  useTabs: false,
  singleQuote: true,
  quoteProps: 'consistent',
  trailingComma: 'all',
  arrowParens: 'avoid',
  semi: false,
  printWidth: 90,
  bracketSpacing: true,
}
