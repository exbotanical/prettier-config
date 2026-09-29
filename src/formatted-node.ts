import type { Printer } from 'prettier'

/** The AST format of a parse result that contains the formatted file. */
export const FORMATTED_AST_FORMAT = 'exbotanical-formatted'

/**
 * A parse result that contains the formatted file.
 */
export interface FormattedNode {
  type: 'formatted'
  text: string
  start: number
  end: number
}

/** Wraps formatted text in a node that spans the whole source file. */
export function formattedNode(text: string, source: string): FormattedNode {
  return { type: 'formatted', text, start: 0, end: source.length }
}

export const locStart = (node: FormattedNode): number => node.start
export const locEnd = (node: FormattedNode): number => node.end

/** Prints a formatted node's text. */
export const FORMATTED_PRINTER: Printer<FormattedNode> = {
  print: path => path.node.text,
}
