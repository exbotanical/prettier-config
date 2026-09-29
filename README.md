# @exbotanical/prettier-config

Extensible prettier configurations for the punctilious developer.

## Usage

```bash
npm i -D prettier @exbotanical/prettier-config
```

```mjs
// In prettier.config.mjs
import exbotanical from '@exbotanical/prettier-config'

export default await exbotanical({
  shell: true,
  toml: { tableBlankLines: 2 },
})
```

`exbotanical` is a promise which resolves to a valid Prettier config object (Prettier also accepts an unresolved config promise as the default export).

## Plugins

Each key enables one plugin: pass `true` to use that plugin's defaults (as defined by _this_ package, not the upstream plugin's defaults - see [the config options docs](./docs/options.md)), and an object sets its options. Each plugin requires an optional peer dependency that must be installed when enabled.

| Key          | Package                                                      |
| ------------ | ------------------------------------------------------------ |
| `xml`        | `@prettier/plugin-xml`                                       |
| `shell`      | `prettier-plugin-sh`                                         |
| `docker`     | `prettier-plugin-sh`, which bundles its Dockerfile formatter |
| `toml`       | `prettier-plugin-toml`                                       |
| `ini`        | `prettier-plugin-ini`                                        |
| `properties` | `prettier-plugin-properties`                                 |
| `nginx`      | `prettier-plugin-nginx`                                      |
| `sql`        | `prettier-plugin-sql`                                        |
| `solidity`   | `prettier-plugin-solidity`                                   |

`core` overrides this config's Prettier core options. All options and their defaults are enumerated in [docs/options.md](docs/options.md).
