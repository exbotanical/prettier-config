# @magister_zito/prettier-config

Extensible prettier configurations for the punctilious developer.

## Usage

```bash
pnpm add -D @magister_zito/prettier-config
```

In package.json:

```json
{
  // ...
  "prettier": "@magister_zito/prettier-config"
}
```

Extending .prettierignore:

```bash
prettier . --write --ignore-path node_modules/@magister_zito/prettier-config/.prettierignore
```
