import type { TSESLint } from '@typescript-eslint/utils'
import { version } from '../package.json'
import autoInsertComponent from './rules/auto-insert-component'

export const plugin: TSESLint.Linter.Plugin = {
  meta: {
    name: 'unimport-component',
    version,
  },
  rules: {
    'auto-insert-component': autoInsertComponent,
  },
}
