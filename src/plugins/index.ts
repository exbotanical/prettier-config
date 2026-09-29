import { ini } from './ini'
import { nginx } from './nginx'
import { properties } from './properties'
import { shell } from './shell'
import { solidity } from './solidity'
import { sql } from './sql'
import { toml } from './toml'
import { xml } from './xml'

import type { ConfiguredPlugin } from '../plugin-definition'

/**
 * Every supported plugin, in the order its plugin object appears in the config.
 * `properties` follows `ini`, so that `.properties` files go to prettier-plugin-properties
 * when both are enabled.
 */
export const PLUGINS: ConfiguredPlugin[] = [
  xml,
  shell,
  toml,
  ini,
  properties,
  nginx,
  sql,
  solidity,
]
