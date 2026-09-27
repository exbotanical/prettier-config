# @exbotanical/prettier-config

Extensible prettier configurations for the punctilious developer.

## Usage

```bash
npm i -D prettier @exbotanical/prettier-config
```

```mjs
import exbotanical from '@exbotanical/prettier-config'

export default exbotanical({
  // ...options
})
```

## Plugins

The `plugins` option enables per-language prettier plugins. All of these options are disabled by default. Each plugin is an optional peer dependency that must be installed alongside this package when enabled.

```bash
npm i -D prettier-plugin-sh prettier-plugin-ini
```

```mjs
export default exbotanical({
  plugins: { shell: true, ini: true },
})
```

| Option       | Package                      |
| ------------ | ---------------------------- |
| `xml`        | `@prettier/plugin-xml`       |
| `shell`      | `prettier-plugin-sh`         |
| `toml`       | `prettier-plugin-toml`       |
| `nginx`      | `prettier-plugin-nginx`      |
| `properties` | `prettier-plugin-properties` |
| `sql`        | `prettier-plugin-sql`        |
| `solidity`   | `prettier-plugin-solidity`   |
| `ini`        | `prettier-plugin-ini`        |

### Notes

- The `ini` plugin also formats `.gitconfig` and `.editorconfig` files.
- `plugins: 'all'` enables every plugin in the table that is installed.
- An explicitly enabled plugin that is not installed will cause `exbotanical` to throw an error.
- `exbotanical` returns each enabled plugin as an absolute path, resolved first from this package's install location and then from the current working directory.
