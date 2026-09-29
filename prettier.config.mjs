import { createJiti } from 'jiti'

// Loads the TypeScript sources, so the repo formats itself with its current code and
// needs no build first.
const jiti = createJiti(import.meta.url)
const { default: exbotanical } = await jiti.import('./src/index.ts')

export default await exbotanical()
