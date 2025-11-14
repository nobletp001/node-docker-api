import path from 'path'

import moduleAlias from 'module-alias'

const rootDir = path.resolve(__dirname, '..')

moduleAlias.addAliases({
  '@': rootDir,
})
