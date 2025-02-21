import type { Linter } from 'eslint'
import type { AutoInsertComponentsOptions } from '../types'
import { plugin } from '../plugins'

/**
 * Create a flat config that will report missing components imports and auto insert them.
 */
export async function createAutoComponentsInsert(options: AutoInsertComponentsOptions): Promise<Linter.FlatConfig> {
  return {
    name: 'unimport-components:auto-insert-components',
    plugins: {
      'unimport-components': plugin as any,
    },
    files: options.include ?? ['**/*.?([cm])[jt]s?(x)', '**/*.vue'],
    ignores: options.exclude ?? ['**/*.md?(x)/**'],
    rules: {
      'unimport-components/auto-insert-components': [
        'error',
        options.imports,
      ],
    },
  }
}
