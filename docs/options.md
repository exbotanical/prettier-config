# @exbotanical/prettier-config

## Interfaces

### OptionsDocker

Options for Dockerfile formatting.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-files"></a> `files?`

</td>
<td>

`string`[]

</td>
<td>

Glob patterns for the files formatted as Dockerfiles. Setting this replaces the
defaults.

**Default**

```ts
;[
  '**/Dockerfile',
  '**/Containerfile',
  '**/*.dockerfile',
  '**/*.containerfile',
  '**/Dockerfile.*',
]
```

</td>
</tr>
<tr>
<td>

<a id="property-indent"></a> `indent?`

</td>
<td>

`number`

</td>
<td>

The indentation width of continuation lines. Defaults to `tabWidth`, or 0 with `useTabs`.

</td>
</tr>
<tr>
<td>

<a id="property-spaceredirects"></a> `spaceRedirects?`

</td>
<td>

`boolean`

</td>
<td>

Puts a space after redirection operators such as `>` and `<` in `RUN` commands.

**Default**

```ts
false
```

</td>
</tr>
</tbody>
</table>

---

### OptionsIni

Options for prettier-plugin-ini.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-inispacearoundequals"></a> `iniSpaceAroundEquals?`

</td>
<td>

`boolean`

</td>
<td>

Prints `key = value` instead of `key=value`.

**Default**

```ts
false
```

</td>
</tr>
</tbody>
</table>

---

### OptionsNginx

Options for prettier-plugin-nginx.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-aligndirectives"></a> `alignDirectives?`

</td>
<td>

`boolean`

</td>
<td>

Aligns the parameters of the directives in each block in one column.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="property-alignuniversally"></a> `alignUniversally?`

</td>
<td>

`boolean`

</td>
<td>

Aligns directive parameters in one column across the whole file. Requires
`alignDirectives`.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-continuationindent"></a> `continuationIndent?`

</td>
<td>

`number`

</td>
<td>

The extra indentation of continuation lines.

**Default**

```ts
2
```

</td>
</tr>
<tr>
<td>

<a id="property-wrapparameters"></a> `wrapParameters?`

</td>
<td>

`boolean`

</td>
<td>

Moves parameters onto continuation lines when a directive exceeds `printWidth`.

**Default**

```ts
true
```

</td>
</tr>
</tbody>
</table>

---

### OptionsPrettier

Options for the config factory. Each plugin key enables that plugin: `true` uses its
defaults, and an object sets its options. Each plugin is an optional peer dependency
that must be installed when enabled.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-core"></a> `core?`

</td>
<td>

`Options`

</td>
<td>

Prettier core options.

</td>
</tr>
<tr>
<td>

<a id="property-docker"></a> `docker?`

</td>
<td>

`boolean` \| [`OptionsDocker`](#optionsdocker)

</td>
<td>

Formats Dockerfiles with @reteps/dockerfmt (the formatter is bundled with
prettier-plugin-sh, which therefore must be installed).

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-ini"></a> `ini?`

</td>
<td>

`boolean` \| [`OptionsIni`](#optionsini)

</td>
<td>

Formats INI files, including `.gitconfig` and `.editorconfig`, with
prettier-plugin-ini.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-nginx"></a> `nginx?`

</td>
<td>

`boolean` \| [`OptionsNginx`](#optionsnginx)

</td>
<td>

Formats nginx configuration with prettier-plugin-nginx.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-properties"></a> `properties?`

</td>
<td>

`boolean` \| [`OptionsProperties`](#optionsproperties)

</td>
<td>

Formats Java `.properties` files with prettier-plugin-properties.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-shell"></a> `shell?`

</td>
<td>

`boolean` \| [`OptionsShell`](#optionsshell)

</td>
<td>

Formats shell scripts with prettier-plugin-sh.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-solidity"></a> `solidity?`

</td>
<td>

`boolean` \| [`OptionsSolidity`](#optionssolidity)

</td>
<td>

Formats Solidity with prettier-plugin-solidity.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-sql"></a> `sql?`

</td>
<td>

`boolean` \| [`OptionsSql`](#optionssql)

</td>
<td>

Formats SQL with prettier-plugin-sql.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-toml"></a> `toml?`

</td>
<td>

`boolean` \| [`OptionsToml`](#optionstoml)

</td>
<td>

Formats TOML with prettier-plugin-toml.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-xml"></a> `xml?`

</td>
<td>

`boolean` \| [`OptionsXml`](#optionsxml)

</td>
<td>

Formats XML with @prettier/plugin-xml.

**Default**

```ts
false
```

</td>
</tr>
</tbody>
</table>

---

### OptionsProperties

Options for prettier-plugin-properties.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-escapenonlatin1"></a> `escapeNonLatin1?`

</td>
<td>

`boolean`

</td>
<td>

Rewrites characters outside Latin-1 as `\u` escapes, so the file can be saved as
ISO-8859-1.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-keyseparator"></a> `keySeparator?`

</td>
<td>

`" "` \| `":"` \| `": "` \| `" : "` \| `"="` \| `"= "` \| `" = "`

</td>
<td>

The separator printed between each key and its value.

**Default**

```ts
' = '
```

</td>
</tr>
</tbody>
</table>

---

### OptionsShell

Options for prettier-plugin-sh.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-binarynextline"></a> `binaryNextLine?`

</td>
<td>

`boolean`

</td>
<td>

Puts `&&`, `||`, and `|` at the start of a continued line instead of at the end.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="property-files-1"></a> `files?`

</td>
<td>

`string`[]

</td>
<td>

Glob patterns for the files formatted as shell. Setting this replaces the defaults.

**Default**

```ts
;[
  '**/*.sh',
  '**/*.bash',
  '**/*.zsh',
  '**/.bashrc',
  '**/bashrc',
  '**/.bash_profile',
  '**/bash_profile',
  '**/.bash_logout',
  '**/bash_logout',
  '**/.bash_aliases',
  '**/bash_aliases',
  '**/.bash_functions',
  '**/bash_functions',
  '**/.profile',
  '**/profile',
  '**/.xinitrc',
  '**/xinitrc',
  '**/.xsession',
  '**/xsession',
]
```

</td>
</tr>
<tr>
<td>

<a id="property-functionnextline"></a> `functionNextLine?`

</td>
<td>

`boolean`

</td>
<td>

Moves a function's opening `{` onto its own line.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-functionspace"></a> `functionSpace?`

</td>
<td>

`boolean`

</td>
<td>

Ensures a space exists between function names and the following open parens e.g. `name () {` instead of
`name() {`. With `shopt -s extglob`, bash parses `name?()` as an extended glob, so
functions whose names end in `?`, `*`, `+`, `@`, or `!` need the space.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="property-indent-1"></a> `indent?`

</td>
<td>

`number`

</td>
<td>

The indentation width in spaces; `0` indents with tabs. Defaults to `tabWidth`.

</td>
</tr>
<tr>
<td>

<a id="property-interpreters"></a> `interpreters?`

</td>
<td>

`string`[]

</td>
<td>

The shebang interpreters that mark a file as shell, such as `bash` in
`#!/usr/bin/env bash`. Setting this replaces the defaults.

**Default**

```ts
;['sh', 'bash']
```

</td>
</tr>
<tr>
<td>

<a id="property-keepcomments"></a> `keepComments?`

</td>
<td>

`boolean`

</td>
<td>

Keeps comments. With `false` the formatter deletes them.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="property-minify"></a> `minify?`

</td>
<td>

`boolean`

</td>
<td>

Prints the smallest equivalent script: removes comments other than the shebang,
indentation, and optional spaces.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-recovererrors"></a> `recoverErrors?`

</td>
<td>

`number`

</td>
<td>

The number of missing tokens the parser may skip, so an incomplete script formats.

</td>
</tr>
<tr>
<td>

<a id="property-simplify"></a> `simplify?`

</td>
<td>

`boolean`

</td>
<td>

Removes redundant syntax, such as `$` inside `$(( ))` and quotes around variables
inside `[[ ]]`.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-singleline"></a> `singleLine?`

</td>
<td>

`boolean`

</td>
<td>

Prints the script on one line where the syntax allows it.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-spaceredirects-1"></a> `spaceRedirects?`

</td>
<td>

`boolean`

</td>
<td>

Puts a space after redirection operators such as `>` and `<`.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="property-stopat"></a> `stopAt?`

</td>
<td>

`string`

</td>
<td>

Stops parsing at this word, at most 4 bytes long, and drops everything after it from
the output.

</td>
</tr>
<tr>
<td>

<a id="property-switchcaseindent"></a> `switchCaseIndent?`

</td>
<td>

`boolean`

</td>
<td>

Indents the branches inside `case ... esac`.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="property-variant"></a> `variant?`

</td>
<td>

[`ShellVariant`](#shellvariant)

</td>
<td>

The shell dialect the parser accepts. Files ending in `.zsh`, and files with a zsh
shebang, always use `zsh`.

**Default**

```ts
'bash'
```

</td>
</tr>
</tbody>
</table>

---

### OptionsSolidity

Options for prettier-plugin-solidity. Its `bracketSpacing`, `singleQuote`,
`experimentalTernaries`, and `experimentalOperatorPosition` options are Prettier core
options, set through `core`.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-compiler"></a> `compiler?`

</td>
<td>

`string`

</td>
<td>

The Solidity compiler version the code targets, which the formatter uses to avoid
syntax said version does not support.

</td>
</tr>
</tbody>
</table>

---

### OptionsSql

Options for prettier-plugin-sql.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-database"></a> `database?`

</td>
<td>

`"bigquery"` \| `"db2"` \| `"hive"` \| `"mariadb"` \| `"mysql"` \| `"postgresql"` \| `"snowflake"` \| `"transactsql"` \| `"flinksql"`

</td>
<td>

The SQL dialect that `node-sql-parser` parses.

**Default**

```ts
'mysql'
```

</td>
</tr>
<tr>
<td>

<a id="property-datatypecase"></a> `dataTypeCase?`

</td>
<td>

[`SqlLetterCase`](#sqllettercase)

</td>
<td>

The case of data type names.

**Default**

```ts
'preserve'
```

</td>
</tr>
<tr>
<td>

<a id="property-denseoperators"></a> `denseOperators?`

</td>
<td>

`boolean`

</td>
<td>

Removes the spaces around arithmetic and comparison operators.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-dialect"></a> `dialect?`

</td>
<td>

`string`

</td>
<td>

The `sql-formatter` dialect selected through its `formatDialect()` API.

</td>
</tr>
<tr>
<td>

<a id="property-expressionwidth"></a> `expressionWidth?`

</td>
<td>

`number`

</td>
<td>

The maximum length of a parenthesized expression kept on one line.

**Default**

```ts
50
```

</td>
</tr>
<tr>
<td>

<a id="property-formatter"></a> `formatter?`

</td>
<td>

`"node-sql-parser"` \| `"sql-cst"` \| `"sql-formatter"`

</td>
<td>

The formatting engine.

**Default**

```ts
'sql-formatter'
```

</td>
</tr>
<tr>
<td>

<a id="property-functioncase"></a> `functionCase?`

</td>
<td>

[`SqlLetterCase`](#sqllettercase)

</td>
<td>

The case of function names.

**Default**

```ts
'preserve'
```

</td>
</tr>
<tr>
<td>

<a id="property-identifiercase"></a> `identifierCase?`

</td>
<td>

[`SqlLetterCase`](#sqllettercase)

</td>
<td>

The case of unquoted identifiers (experimental in the plugin).

**Default**

```ts
'preserve'
```

</td>
</tr>
<tr>
<td>

<a id="property-indentstyle"></a> `indentStyle?`

</td>
<td>

`"standard"` \| `"tabularLeft"` \| `"tabularRight"`

</td>
<td>

The indentation layout. The tabular styles put keywords in a fixed-width left column.

**Default**

```ts
'standard'
```

</td>
</tr>
<tr>
<td>

<a id="property-keywordcase"></a> `keywordCase?`

</td>
<td>

[`SqlLetterCase`](#sqllettercase)

</td>
<td>

The case of SQL keywords.

**Default**

```ts
'preserve'
```

</td>
</tr>
<tr>
<td>

<a id="property-language"></a> `language?`

</td>
<td>

`"sql"` \| `"bigquery"` \| `"clickhouse"` \| `"db2"` \| `"db2i"` \| `"hive"` \| `"mariadb"` \| `"mysql"` \| `"n1ql"` \| `"plsql"` \| `"postgresql"` \| `"redshift"` \| `"singlestoredb"` \| `"snowflake"` \| `"spark"` \| `"sqlite"` \| `"transactsql"` \| `"trino"` \| `"tsql"`

</td>
<td>

The SQL dialect that `sql-formatter` parses.

**Default**

```ts
'sql'
```

</td>
</tr>
<tr>
<td>

<a id="property-linesbetweenqueries"></a> `linesBetweenQueries?`

</td>
<td>

`number`

</td>
<td>

The number of blank lines printed between statements.

**Default**

```ts
1
```

</td>
</tr>
<tr>
<td>

<a id="property-logicaloperatornewline"></a> `logicalOperatorNewline?`

</td>
<td>

`"after"` \| `"before"`

</td>
<td>

Whether `AND` and `OR` start or end each wrapped condition line.

**Default**

```ts
'before'
```

</td>
</tr>
<tr>
<td>

<a id="property-newlinebeforesemicolon"></a> `newlineBeforeSemicolon?`

</td>
<td>

`boolean`

</td>
<td>

Puts each statement's `;` on its own line.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-params"></a> `params?`

</td>
<td>

`string`

</td>
<td>

Values that replace placeholders such as `?`, written as a JSOX string.

</td>
</tr>
<tr>
<td>

<a id="property-paramtypes"></a> `paramTypes?`

</td>
<td>

`string`

</td>
<td>

The placeholder syntaxes the parser accepts, written as a JSOX string.

</td>
</tr>
<tr>
<td>

<a id="property-type"></a> `type?`

</td>
<td>

`"column"` \| `"table"`

</td>
<td>

The authority-list check that `node-sql-parser` runs.

**Default**

```ts
'table'
```

</td>
</tr>
</tbody>
</table>

---

### OptionsToml

Options for prettier-plugin-toml.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-arraybracketspacewidth"></a> `arrayBracketSpaceWidth?`

</td>
<td>

`number`

</td>
<td>

The number of spaces inside the brackets of a single-line array.

**Default**

```ts
0
```

</td>
</tr>
<tr>
<td>

<a id="property-arraycommaspacewidth"></a> `arrayCommaSpaceWidth?`

</td>
<td>

`number`

</td>
<td>

The number of spaces after each comma in a single-line array.

**Default**

```ts
1
```

</td>
</tr>
<tr>
<td>

<a id="property-commentstyle"></a> `commentStyle?`

</td>
<td>

`"preserve"` \| `"normalize"`

</td>
<td>

`normalize` adds a space after `#`, except in `#!` lines; `preserve` keeps comments as
written.

**Default**

```ts
'normalize'
```

</td>
</tr>
<tr>
<td>

<a id="property-datetimedelimiter"></a> `dateTimeDelimiter?`

</td>
<td>

`"preserve"` \| `"space"` \| `"T"`

</td>
<td>

The character between the date and the time in date-time values.

**Default**

```ts
'T'
```

</td>
</tr>
<tr>
<td>

<a id="property-groupblanklineslimit"></a> `groupBlankLinesLimit?`

</td>
<td>

`number`

</td>
<td>

The maximum number of blank lines kept between groups of entries. Must be at least 1.

**Default**

```ts
1
```

</td>
</tr>
<tr>
<td>

<a id="property-indentsubtables"></a> `indentSubTables?`

</td>
<td>

`boolean`

</td>
<td>

Indents subtables, and their entries, under the parent table.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-indenttablekeyvaluepairs"></a> `indentTableKeyValuePairs?`

</td>
<td>

`boolean`

</td>
<td>

Indents entries under their table header.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="property-inlinetablebracespacewidth"></a> `inlineTableBraceSpaceWidth?`

</td>
<td>

`number`

</td>
<td>

The number of spaces inside the braces of a single-line inline table. Defaults to 1 or 0
from `bracketSpacing`.

</td>
</tr>
<tr>
<td>

<a id="property-inlinetablecommaspacewidth"></a> `inlineTableCommaSpaceWidth?`

</td>
<td>

`number`

</td>
<td>

The number of spaces after each comma in a single-line inline table.

**Default**

```ts
1
```

</td>
</tr>
<tr>
<td>

<a id="property-keyquotestyle"></a> `keyQuoteStyle?`

</td>
<td>

`"preserve"` \| `"double"` \| `"single"`

</td>
<td>

The quote character for quoted keys. Defaults to `stringQuoteStyle`.

</td>
</tr>
<tr>
<td>

<a id="property-keyvalueequalssignalignment"></a> `keyValueEqualsSignAlignment?`

</td>
<td>

`boolean`

</td>
<td>

Aligns the `=` of consecutive entries in one column.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-keyvalueequalssignspacewidth"></a> `keyValueEqualsSignSpaceWidth?`

</td>
<td>

`number`

</td>
<td>

The number of spaces on each side of `=`.

**Default**

```ts
1
```

</td>
</tr>
<tr>
<td>

<a id="property-stringquotestyle"></a> `stringQuoteStyle?`

</td>
<td>

`"preserve"` \| `"double"` \| `"single"`

</td>
<td>

The quote character for strings. Strings that contain escapes keep double quotes, so
the value does not change. Defaults to `single` or `double` from `singleQuote`.

</td>
</tr>
<tr>
<td>

<a id="property-tableblanklines"></a> `tableBlankLines?`

</td>
<td>

`number`

</td>
<td>

The number of blank lines printed between tables.

**Default**

```ts
1
```

</td>
</tr>
<tr>
<td>

<a id="property-tomlversion"></a> `tomlVersion?`

</td>
<td>

`"v1.0.0"` \| `"v1.1.0"` \| `"v1.1.0-preview"`

</td>
<td>

The TOML specification version used to parse and format.

**Default**

```ts
'v1.0.0'
```

</td>
</tr>
<tr>
<td>

<a id="property-trailingcommentalignment"></a> `trailingCommentAlignment?`

</td>
<td>

`boolean`

</td>
<td>

Aligns the trailing comments of consecutive entries in one column.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-trailingcommentspacewidth"></a> `trailingCommentSpaceWidth?`

</td>
<td>

`number`

</td>
<td>

The number of spaces before a trailing comment.

**Default**

```ts
2
```

</td>
</tr>
</tbody>
</table>

---

### OptionsXml

Options for @prettier/plugin-xml.

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="property-xmlquoteattributes"></a> `xmlQuoteAttributes?`

</td>
<td>

`"preserve"` \| `"double"` \| `"single"`

</td>
<td>

The quote character around attribute values. `double` escapes embedded double quotes.

**Default**

```ts
'preserve'
```

</td>
</tr>
<tr>
<td>

<a id="property-xmlselfclosingspace"></a> `xmlSelfClosingSpace?`

</td>
<td>

`boolean`

</td>
<td>

Adds a space before `/>` in self-closing tags.

**Default**

```ts
true
```

</td>
</tr>
<tr>
<td>

<a id="property-xmlsortattributesbykey"></a> `xmlSortAttributesByKey?`

</td>
<td>

`boolean`

</td>
<td>

Sorts attributes alphabetically, with `xmlns` attributes first.

**Default**

```ts
false
```

</td>
</tr>
<tr>
<td>

<a id="property-xmlwhitespacesensitivity"></a> `xmlWhitespaceSensitivity?`

</td>
<td>

`"preserve"` \| `"ignore"` \| `"strict"`

</td>
<td>

How whitespace inside elements is handled: `strict` keeps it as written, `preserve`
re-indents whitespace-only text between elements, and `ignore` also reflows text.

**Default**

```ts
'strict'
```

</td>
</tr>
</tbody>
</table>

## Type Aliases

### ShellVariant

> **ShellVariant** = `"bash"` \| `"bats"` \| `"mksh"` \| `"posix"` \| `"zsh"`

The shell dialects that prettier-plugin-sh parses.

---

### SqlLetterCase

> **SqlLetterCase** = `"lower"` \| `"preserve"` \| `"upper"`

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
