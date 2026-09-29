import picomatch from 'picomatch'

/**
 * Returns a matcher for glob patterns such as `**\/*.sh`. Prettier passes absolute paths,
 * so the matcher removes the root, which allows a leading `**\/` to match from the top of the
 * filesystem. Paths are compared with `/` separators on every platform.
 */
export function createPathMatcher(globs: string[]): (filepath: string) => boolean {
  const isMatch = picomatch(globs, { dot: true })
  return filepath => isMatch(withoutRoot(filepath))
}

function withoutRoot(filepath: string): string {
  return filepath.replaceAll('\\', '/').replace(/^(?:[a-z]:)?\/+/i, '')
}
