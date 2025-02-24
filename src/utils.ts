import { ESLintUtils } from '@typescript-eslint/utils'
import { relative } from 'pathe'

export const createRule = ESLintUtils.RuleCreator(() => 'https://github.com/ilyaliao/eslint-plugin-auto-insert-components')

export function betterRelative(from: string, to: string): string {
  const r = relative(from, to)
  const ext = to.match(/\.\w+$/)?.[0] || ''
  const path = r.replace(/\.\w+$/, '')

  if (path.startsWith('../'))
    return path + ext
  return `./${path}${ext}`
}
