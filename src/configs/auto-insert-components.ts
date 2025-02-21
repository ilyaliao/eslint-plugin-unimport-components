import type { Linter } from 'eslint'
import type { UnimportComponentsAutoInsertOptions } from '../types'
import { plugin } from '../plugins'

/**
 * Create a flat config that will report missing components imports and auto insert them.
 */
export async function createAutoComponentsInsert(options: UnimportComponentsAutoInsertOptions): Promise<Linter.FlatConfig> {
  return {
    name: 'unimport:auto-insert-components',
    plugins: {
      unimport: plugin as any,
    },
    files: options.include ?? ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],
    ignores: options.exclude ?? ['**/*.md?(x)/**'],
    rules: {
      'unimport/auto-insert-components': [
        'error',
        options.imports,
      ],
    },
  }
}
