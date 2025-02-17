import { resolve } from 'node:path'
// @ts-check
import antfu from '@antfu/eslint-config'
import { scanFilesFromDir } from 'unimport'
import { createAutoInsert } from './src'

export default antfu(
  {
    ignores: ['**/fixtures/**'],
    vue: true,
  },
).append((async () => {
  const path = resolve(__dirname, '*/components/**/*.vue')
  const files = await scanFilesFromDir([
    {
      glob: path,
      types: false,
    },
  ])

  return createAutoInsert({
    imports: files.map(file => ({
      name: 'default',
      as: file.split('/').pop()?.replace('.vue', '') || '',
      from: file,
    })),
  })
})())
