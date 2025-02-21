import { dirname, isAbsolute } from 'pathe'
import { createImportsListeners } from '../listener'
import { betterRelative, createRule } from '../utils'

export default createRule({
  name: 'auto-insert-components',
  meta: {
    type: 'problem',
    docs: {
      description: 'Auto insert missing components imports',
    },
    messages: {
      missingImport: `Missing import '{{name}}' from '{{from}}'.`,
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
        const resolvedFrom = isAbsolute(item.from)
          ? betterRelative(dirname(context.physicalFilename), item.from)
          : item.from

        context.report({
          node,
          messageId: 'missingImport',
          data: {
            name: item.name === 'default' ? item.as : item.name,
            from: resolvedFrom,
          },
          fix(fixer) {
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
