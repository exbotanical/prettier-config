# @exbotanical/prettier-config

## Interfaces

### OptionsDocker

Options for Dockerfile formatting.

#### Properties

| Property                                               | Type       | Description                                                                                                                                                                                               |
| ------------------------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-files"></a> `files?`                   | `string`[] | Glob patterns for the files formatted as Dockerfiles. Setting this replaces the defaults. **Default** `['**/Dockerfile', '**/Containerfile', '**/*.dockerfile', '**/*.containerfile', '**/Dockerfile.*']` |
| <a id="property-indent"></a> `indent?`                 | `number`   | The indentation width of continuation lines. Defaults to `tabWidth`, or 0 with `useTabs`.                                                                                                                 |
| <a id="property-spaceredirects"></a> `spaceRedirects?` | `boolean`  | Puts a space after redirection operators such as `>` and `<` in `RUN` commands. **Default** `false`                                                                                                       |

---

### OptionsIni

Options for prettier-plugin-ini.

#### Properties

| Property                                                           | Type      | Description                                                      |
| ------------------------------------------------------------------ | --------- | ---------------------------------------------------------------- |
| <a id="property-inispacearoundequals"></a> `iniSpaceAroundEquals?` | `boolean` | Prints `key = value` instead of `key=value`. **Default** `false` |

---

### OptionsNginx

Options for prettier-plugin-nginx.

#### Properties

| Property                                                       | Type      | Description                                                                                                      |
| -------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| <a id="property-aligndirectives"></a> `alignDirectives?`       | `boolean` | Aligns the parameters of the directives in each block in one column. **Default** `true`                          |
| <a id="property-alignuniversally"></a> `alignUniversally?`     | `boolean` | Aligns directive parameters in one column across the whole file. Requires `alignDirectives`. **Default** `false` |
| <a id="property-continuationindent"></a> `continuationIndent?` | `number`  | The extra indentation of continuation lines. **Default** `2`                                                     |
| <a id="property-wrapparameters"></a> `wrapParameters?`         | `boolean` | Moves parameters onto continuation lines when a directive exceeds `printWidth`. **Default** `true`               |

---

### OptionsPrettier

Options for the config factory. Each plugin key enables that plugin: `true` uses its
defaults, and an object sets its options. Each plugin is an optional peer dependency
that must be installed when enabled.

#### Properties

| Property                                       | Type                                                   | Description                                                                                                                                           |
| ---------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-core"></a> `core?`             | `Options`                                              | Prettier core options.                                                                                                                                |
| <a id="property-docker"></a> `docker?`         | `boolean` \| [`OptionsDocker`](#optionsdocker)         | Formats Dockerfiles with @reteps/dockerfmt (the formatter is bundled with prettier-plugin-sh, which therefore must be installed). **Default** `false` |
| <a id="property-ini"></a> `ini?`               | `boolean` \| [`OptionsIni`](#optionsini)               | Formats INI files, including `.gitconfig` and `.editorconfig`, with prettier-plugin-ini. **Default** `false`                                          |
| <a id="property-nginx"></a> `nginx?`           | `boolean` \| [`OptionsNginx`](#optionsnginx)           | Formats nginx configuration with prettier-plugin-nginx. **Default** `false`                                                                           |
| <a id="property-properties"></a> `properties?` | `boolean` \| [`OptionsProperties`](#optionsproperties) | Formats Java `.properties` files with prettier-plugin-properties. **Default** `false`                                                                 |
| <a id="property-shell"></a> `shell?`           | `boolean` \| [`OptionsShell`](#optionsshell)           | Formats shell scripts with prettier-plugin-sh. **Default** `false`                                                                                    |
| <a id="property-solidity"></a> `solidity?`     | `boolean` \| [`OptionsSolidity`](#optionssolidity)     | Formats Solidity with prettier-plugin-solidity. **Default** `false`                                                                                   |
| <a id="property-sql"></a> `sql?`               | `boolean` \| [`OptionsSql`](#optionssql)               | Formats SQL with prettier-plugin-sql. **Default** `false`                                                                                             |
| <a id="property-toml"></a> `toml?`             | `boolean` \| [`OptionsToml`](#optionstoml)             | Formats TOML with prettier-plugin-toml. **Default** `false`                                                                                           |
| <a id="property-xml"></a> `xml?`               | `boolean` \| [`OptionsXml`](#optionsxml)               | Formats XML with @prettier/plugin-xml. **Default** `false`                                                                                            |

---

### OptionsProperties

Options for prettier-plugin-properties.

#### Properties

| Property                                                 | Type                                                              | Description                                                                                                      |
| -------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| <a id="property-escapenonlatin1"></a> `escapeNonLatin1?` | `boolean`                                                         | Rewrites characters outside Latin-1 as `\u` escapes, so the file can be saved as ISO-8859-1. **Default** `false` |
| <a id="property-keyseparator"></a> `keySeparator?`       | `" "` \| `":"` \| `"="` \| `": "` \| `"= "` \| `" : "` \| `" = "` | The separator printed between each key and its value. **Default** `' = '`                                        |

---

### OptionsShell

Options for prettier-plugin-sh.

#### Properties

| Property                                                   | Type                            | Description                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a id="property-binarynextline"></a> `binaryNextLine?`     | `boolean`                       | Puts `&&`, `                                                                                                                                                                                                                                                                                                                                                                                                             |     | `, and ` | `at the start of a continued line instead of at the end. **Default**`true` |
| <a id="property-files-1"></a> `files?`                     | `string`[]                      | Glob patterns for the files formatted as shell. Setting this replaces the defaults. **Default** `['**/*.sh', '**/*.bash', '**/*.zsh', '**/.bashrc', '**/bashrc', '**/.bash_profile', '**/bash_profile', '**/.bash_logout', '**/bash_logout', '**/.bash_aliases', '**/bash_aliases', '**/.bash_functions', '**/bash_functions', '**/.profile', '**/profile', '**/.xinitrc', '**/xinitrc', '**/.xsession', '**/xsession']` |
| <a id="property-functionnextline"></a> `functionNextLine?` | `boolean`                       | Moves a function's opening `{` onto its own line. **Default** `false`                                                                                                                                                                                                                                                                                                                                                    |
| <a id="property-functionspace"></a> `functionSpace?`       | `boolean`                       | Ensures a space exists between function names and the following open parens e.g. `name () {` instead of `name() {`. With `shopt -s extglob`, bash parses `name?()` as an extended glob, so functions whose names end in `?`, `*`, `+`, `@`, or `!` need the space. **Default** `true`                                                                                                                                    |
| <a id="property-indent-1"></a> `indent?`                   | `number`                        | The indentation width in spaces; `0` indents with tabs. Defaults to `tabWidth`.                                                                                                                                                                                                                                                                                                                                          |
| <a id="property-interpreters"></a> `interpreters?`         | `string`[]                      | The shebang interpreters that mark a file as shell, such as `bash` in `#!/usr/bin/env bash`. Setting this replaces the defaults. **Default** `['sh', 'bash']`                                                                                                                                                                                                                                                            |
| <a id="property-keepcomments"></a> `keepComments?`         | `boolean`                       | Keeps comments. With `false` the formatter deletes them. **Default** `true`                                                                                                                                                                                                                                                                                                                                              |
| <a id="property-minify"></a> `minify?`                     | `boolean`                       | Prints the smallest equivalent script: removes comments other than the shebang, indentation, and optional spaces. **Default** `false`                                                                                                                                                                                                                                                                                    |
| <a id="property-recovererrors"></a> `recoverErrors?`       | `number`                        | The number of missing tokens the parser may skip, so an incomplete script formats.                                                                                                                                                                                                                                                                                                                                       |
| <a id="property-simplify"></a> `simplify?`                 | `boolean`                       | Removes redundant syntax, such as `$` inside `$(( ))` and quotes around variables inside `[[ ]]`. **Default** `false`                                                                                                                                                                                                                                                                                                    |
| <a id="property-singleline"></a> `singleLine?`             | `boolean`                       | Prints the script on one line where the syntax allows it. **Default** `false`                                                                                                                                                                                                                                                                                                                                            |
| <a id="property-spaceredirects-1"></a> `spaceRedirects?`   | `boolean`                       | Puts a space after redirection operators such as `>` and `<`. **Default** `true`                                                                                                                                                                                                                                                                                                                                         |
| <a id="property-stopat"></a> `stopAt?`                     | `string`                        | Stops parsing at this word, at most 4 bytes long, and drops everything after it from the output.                                                                                                                                                                                                                                                                                                                         |
| <a id="property-switchcaseindent"></a> `switchCaseIndent?` | `boolean`                       | Indents the branches inside `case ... esac`. **Default** `true`                                                                                                                                                                                                                                                                                                                                                          |
| <a id="property-variant"></a> `variant?`                   | [`ShellVariant`](#shellvariant) | The shell dialect the parser accepts. Files ending in `.zsh`, and files with a zsh shebang, always use `zsh`. **Default** `'bash'`                                                                                                                                                                                                                                                                                       |

---

### OptionsSolidity

Options for prettier-plugin-solidity. Its `bracketSpacing`, `singleQuote`,
`experimentalTernaries`, and `experimentalOperatorPosition` options are Prettier core
options, set through `core`.

#### Properties

| Property                                   | Type     | Description                                                                                                             |
| ------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| <a id="property-compiler"></a> `compiler?` | `string` | The Solidity compiler version the code targets, which the formatter uses to avoid syntax said version does not support. |

---

### OptionsSql

Options for prettier-plugin-sql.

#### Properties

| Property                                                               | Type                                                                                                                                                                                                                                                                             | Description                                                                                                    |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| <a id="property-database"></a> `database?`                             | `"bigquery"` \| `"db2"` \| `"hive"` \| `"mariadb"` \| `"mysql"` \| `"postgresql"` \| `"snowflake"` \| `"transactsql"` \| `"flinksql"`                                                                                                                                            | The SQL dialect that `node-sql-parser` parses. **Default** `'mysql'`                                           |
| <a id="property-datatypecase"></a> `dataTypeCase?`                     | [`SqlLetterCase`](#sqllettercase)                                                                                                                                                                                                                                                | The case of data type names. **Default** `'preserve'`                                                          |
| <a id="property-denseoperators"></a> `denseOperators?`                 | `boolean`                                                                                                                                                                                                                                                                        | Removes the spaces around arithmetic and comparison operators. **Default** `false`                             |
| <a id="property-dialect"></a> `dialect?`                               | `string`                                                                                                                                                                                                                                                                         | The `sql-formatter` dialect selected through its `formatDialect()` API.                                        |
| <a id="property-expressionwidth"></a> `expressionWidth?`               | `number`                                                                                                                                                                                                                                                                         | The maximum length of a parenthesized expression kept on one line. **Default** `50`                            |
| <a id="property-formatter"></a> `formatter?`                           | `"sql-formatter"` \| `"node-sql-parser"` \| `"sql-cst"`                                                                                                                                                                                                                          | The formatting engine. **Default** `'sql-formatter'`                                                           |
| <a id="property-functioncase"></a> `functionCase?`                     | [`SqlLetterCase`](#sqllettercase)                                                                                                                                                                                                                                                | The case of function names. **Default** `'preserve'`                                                           |
| <a id="property-identifiercase"></a> `identifierCase?`                 | [`SqlLetterCase`](#sqllettercase)                                                                                                                                                                                                                                                | The case of unquoted identifiers (experimental in the plugin). **Default** `'preserve'`                        |
| <a id="property-indentstyle"></a> `indentStyle?`                       | `"standard"` \| `"tabularLeft"` \| `"tabularRight"`                                                                                                                                                                                                                              | The indentation layout. The tabular styles put keywords in a fixed-width left column. **Default** `'standard'` |
| <a id="property-keywordcase"></a> `keywordCase?`                       | [`SqlLetterCase`](#sqllettercase)                                                                                                                                                                                                                                                | The case of SQL keywords. **Default** `'preserve'`                                                             |
| <a id="property-language"></a> `language?`                             | `"sql"` \| `"bigquery"` \| `"db2"` \| `"db2i"` \| `"hive"` \| `"mariadb"` \| `"mysql"` \| `"n1ql"` \| `"plsql"` \| `"postgresql"` \| `"redshift"` \| `"singlestoredb"` \| `"snowflake"` \| `"spark"` \| `"sqlite"` \| `"transactsql"` \| `"tsql"` \| `"trino"` \| `"clickhouse"` | The SQL dialect that `sql-formatter` parses. **Default** `'sql'`                                               |
| <a id="property-linesbetweenqueries"></a> `linesBetweenQueries?`       | `number`                                                                                                                                                                                                                                                                         | The number of blank lines printed between statements. **Default** `1`                                          |
| <a id="property-logicaloperatornewline"></a> `logicalOperatorNewline?` | `"before"` \| `"after"`                                                                                                                                                                                                                                                          | Whether `AND` and `OR` start or end each wrapped condition line. **Default** `'before'`                        |
| <a id="property-newlinebeforesemicolon"></a> `newlineBeforeSemicolon?` | `boolean`                                                                                                                                                                                                                                                                        | Puts each statement's `;` on its own line. **Default** `false`                                                 |
| <a id="property-params"></a> `params?`                                 | `string`                                                                                                                                                                                                                                                                         | Values that replace placeholders such as `?`, written as a JSOX string.                                        |
| <a id="property-paramtypes"></a> `paramTypes?`                         | `string`                                                                                                                                                                                                                                                                         | The placeholder syntaxes the parser accepts, written as a JSOX string.                                         |
| <a id="property-type"></a> `type?`                                     | `"table"` \| `"column"`                                                                                                                                                                                                                                                          | The authority-list check that `node-sql-parser` runs. **Default** `'table'`                                    |

---

### OptionsToml

Options for prettier-plugin-toml.

#### Properties

| Property                                                                           | Type                                           | Description                                                                                                                                                          |
| ---------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-arraybracketspacewidth"></a> `arrayBracketSpaceWidth?`             | `number`                                       | The number of spaces inside the brackets of a single-line array. **Default** `0`                                                                                     |
| <a id="property-arraycommaspacewidth"></a> `arrayCommaSpaceWidth?`                 | `number`                                       | The number of spaces after each comma in a single-line array. **Default** `1`                                                                                        |
| <a id="property-commentstyle"></a> `commentStyle?`                                 | `"preserve"` \| `"normalize"`                  | `normalize` adds a space after `#`, except in `#!` lines; `preserve` keeps comments as written. **Default** `'normalize'`                                            |
| <a id="property-datetimedelimiter"></a> `dateTimeDelimiter?`                       | `"preserve"` \| `"T"` \| `"space"`             | The character between the date and the time in date-time values. **Default** `'T'`                                                                                   |
| <a id="property-groupblanklineslimit"></a> `groupBlankLinesLimit?`                 | `number`                                       | The maximum number of blank lines kept between groups of entries. Must be at least 1. **Default** `1`                                                                |
| <a id="property-indentsubtables"></a> `indentSubTables?`                           | `boolean`                                      | Indents subtables, and their entries, under the parent table. **Default** `false`                                                                                    |
| <a id="property-indenttablekeyvaluepairs"></a> `indentTableKeyValuePairs?`         | `boolean`                                      | Indents entries under their table header. **Default** `true`                                                                                                         |
| <a id="property-inlinetablebracespacewidth"></a> `inlineTableBraceSpaceWidth?`     | `number`                                       | The number of spaces inside the braces of a single-line inline table. Defaults to 1 or 0 from `bracketSpacing`.                                                      |
| <a id="property-inlinetablecommaspacewidth"></a> `inlineTableCommaSpaceWidth?`     | `number`                                       | The number of spaces after each comma in a single-line inline table. **Default** `1`                                                                                 |
| <a id="property-keyquotestyle"></a> `keyQuoteStyle?`                               | `"preserve"` \| `"double"` \| `"single"`       | The quote character for quoted keys. Defaults to `stringQuoteStyle`.                                                                                                 |
| <a id="property-keyvalueequalssignalignment"></a> `keyValueEqualsSignAlignment?`   | `boolean`                                      | Aligns the `=` of consecutive entries in one column. **Default** `false`                                                                                             |
| <a id="property-keyvalueequalssignspacewidth"></a> `keyValueEqualsSignSpaceWidth?` | `number`                                       | The number of spaces on each side of `=`. **Default** `1`                                                                                                            |
| <a id="property-stringquotestyle"></a> `stringQuoteStyle?`                         | `"preserve"` \| `"double"` \| `"single"`       | The quote character for strings. Strings that contain escapes keep double quotes, so the value does not change. Defaults to `single` or `double` from `singleQuote`. |
| <a id="property-tableblanklines"></a> `tableBlankLines?`                           | `number`                                       | The number of blank lines printed between tables. **Default** `1`                                                                                                    |
| <a id="property-tomlversion"></a> `tomlVersion?`                                   | `"v1.0.0"` \| `"v1.1.0"` \| `"v1.1.0-preview"` | The TOML specification version used to parse and format. **Default** `'v1.0.0'`                                                                                      |
| <a id="property-trailingcommentalignment"></a> `trailingCommentAlignment?`         | `boolean`                                      | Aligns the trailing comments of consecutive entries in one column. **Default** `false`                                                                               |
| <a id="property-trailingcommentspacewidth"></a> `trailingCommentSpaceWidth?`       | `number`                                       | The number of spaces before a trailing comment. **Default** `2`                                                                                                      |

---

### OptionsXml

Options for @prettier/plugin-xml.

#### Properties

| Property                                                                   | Type                                     | Description                                                                                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-xmlquoteattributes"></a> `xmlQuoteAttributes?`             | `"preserve"` \| `"double"` \| `"single"` | The quote character around attribute values. `double` escapes embedded double quotes. **Default** `'preserve'`                                                                               |
| <a id="property-xmlselfclosingspace"></a> `xmlSelfClosingSpace?`           | `boolean`                                | Adds a space before `/>` in self-closing tags. **Default** `true`                                                                                                                            |
| <a id="property-xmlsortattributesbykey"></a> `xmlSortAttributesByKey?`     | `boolean`                                | Sorts attributes alphabetically, with `xmlns` attributes first. **Default** `false`                                                                                                          |
| <a id="property-xmlwhitespacesensitivity"></a> `xmlWhitespaceSensitivity?` | `"preserve"` \| `"strict"` \| `"ignore"` | How whitespace inside elements is handled: `strict` keeps it as written, `preserve` re-indents whitespace-only text between elements, and `ignore` also reflows text. **Default** `'strict'` |

## Type Aliases

### ShellVariant

> **ShellVariant** = `"bash"` \| `"posix"` \| `"mksh"` \| `"bats"` \| `"zsh"`

The shell dialects that prettier-plugin-sh parses.

---

### SqlLetterCase

> **SqlLetterCase** = `"preserve"` \| `"upper"` \| `"lower"`

The case a sql option converts names to.

## Variables

### PRETTIER\_OPTIONS

> `const` **PRETTIER\_OPTIONS**: `Options`

The Prettier core options this config sets. Set via the `core` factory option.

## Functions

### default()

> **default**(`options?`): `Promise`\<`Config`\>

Builds the Prettier config. Loads each enabled plugin and returns a promise which resolves to a prettier `Config`.

#### Parameters

##### options?

[`OptionsPrettier`](#optionsprettier) = `{}`

#### Returns

`Promise`\<`Config`\>
