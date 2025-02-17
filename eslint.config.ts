// @ts-check
import antfu from '@antfu/eslint-config'
import { createAutoInsert } from './src'

export default antfu(
  {
    ignores: ['**/fixtures/**'],
    vue: true,
  },
).append((async () => {
  return createAutoInsert({
    imports: [],
  })
})())
