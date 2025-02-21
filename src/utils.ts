import { ESLintUtils } from '@typescript-eslint/utils'
import { relative } from 'pathe'

export const createRule = ESLintUtils.RuleCreator(() => 'https://github.com/ilyaliao/eslint-plugin-auto-insert-components')

export function betterRelative(from: string, to: string): string {
  const r = relative(from, to).replace(/\.\w+/g, '')
  if (r.startsWith('../'))
    return r
  return `./${r}.vue`
}
