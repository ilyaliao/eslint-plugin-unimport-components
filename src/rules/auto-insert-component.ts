import { dirname, isAbsolute } from 'pathe'
import { createImportsListeners } from '../listener'
import { betterRelative, createRule } from '../utils'

export default createRule({
  name: 'auto-insert-component',
  meta: {
    type: 'problem',
    docs: {
      description: 'Auto insert missing component imports',
    },
    messages: {
      missingImport: `Unimport entry '{{name}}' from '{{from}}' is not imported.`,
    },
    schema: [
      { type: 'array', items: { type: 'any' } },
    ],
    fixable: 'code',
  },
  defaultOptions: [[]],
  create(context) {
    return createImportsListeners(
      context,
      context.options[0] || [],
      (node, item) => {
        context.report({
          node,
          messageId: 'missingImport',
          data: {
            name: item.name,
            from: item.from,
          },
          fix(fixer) {
            const resolvedFrom = isAbsolute(item.from)
              ? betterRelative(dirname(context.physicalFilename), item.from)
              : item.from
            const program = context.sourceCode.ast
            const target = program.body[0] || program
            const importName = item.name === 'default'
              ? item.as
              : (!item.as || item.name === item.as)
                  ? `{ ${item.name} }`
                  : `{ ${item.name} as ${item.as} }`
            return fixer.insertTextBefore(target, `import ${importName} from '${resolvedFrom}'\n`)
          },
        })
      },
    )
  },
})
