import { resolve } from 'node:path'
// @ts-check
import antfu from '@antfu/eslint-config'
import { scanFilesFromDir } from 'unimport'
import { createAutoComponentsInsert } from './src'

export default antfu(
  {
    ignores: ['**/fixtures/**'],
    vue: true,
  },
).append((async () => {
  const path = resolve(__dirname, '*/components/**/*.{md,vue}')
  const files = await scanFilesFromDir([
    {
      glob: path,
      types: false,
    },
  ])

  return createAutoComponentsInsert({
    imports: files.map(file => ({
      name: 'default',
      as: file.split('/').pop()?.replace(/\.(vue|md)$/, '') || '',
      from: file,
    })),
  })
})())
