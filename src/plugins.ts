import type { TSESLint } from '@typescript-eslint/utils'
import { version } from '../package.json'
import autoInsertComponents from './rules/auto-insert-components'

export const plugin: TSESLint.Linter.Plugin = {
  meta: {
    name: 'unimport-components',
    version,
  },
  rules: {
    'auto-insert-components': autoInsertComponents,
  },
} as TSESLint.Linter.Plugin
