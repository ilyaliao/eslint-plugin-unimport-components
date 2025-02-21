import type { Scope, ScopeManager } from '@typescript-eslint/scope-manager'
import type { TSESTree } from '@typescript-eslint/utils'
import type { RuleContext, RuleListener } from '@typescript-eslint/utils/ts-eslint'
import type { Import } from './types'
import { analyze } from '@typescript-eslint/scope-manager'
import Debug from 'debug'
import htmlTags from 'html-tags'

const debug = Debug('unimport:eslint')

/**
 * Create a rule listener with a callback the will be called on every unimport entry found.
 */
export function createImportsListeners(
  context: RuleContext<string, any>,
  imports: Import[],
  onImportEntry: (node: TSESTree.Identifier, item: Import) => void,
): RuleListener {
  let _scopeManager: ScopeManager | undefined
  let _importsMap: Map<string, Import> | undefined
  const importedNames = new Set<string>()

  function getScopeManager(): ScopeManager {
    if (!_scopeManager) {
      _scopeManager = analyze(context.sourceCode.ast as any, {
        sourceType: 'module',
      })

      _scopeManager.globalScope?.variables.forEach((node) => {
        importedNames.add(node.name)
      })
    }
    return _scopeManager
  }

  function getImportsMap(): Map<string, Import> {
    if (!_importsMap) {
      _importsMap = new Map<string, Import>()

      imports.forEach((i) => {
        const _name = (i.as || i.name).toLowerCase()
        _importsMap!.set(_name, i)
      })
    }

    return _importsMap
  }

  function checkId(node: TSESTree.Identifier): void {
    if (typeof node.name !== 'string')
      return
    // Already imported
    if (importedNames.has(node.name))
      return
    const importsMap = getImportsMap()
    const item = importsMap.get(node.name)
    if (!item)
      return
    if (item.from === context.filename)
      return

    const scopeManager = getScopeManager()
    if (importedNames.has(node.name))
      return

    let parent: TSESTree.Node | undefined = node.parent
    let currentScope: Scope | null = null
    while (parent && !currentScope) {
      currentScope = scopeManager.acquire(parent)
      if (currentScope)
        break
      parent = parent.parent
    }
    if (!currentScope)
      currentScope = scopeManager.globalScope

    const visited = new Set()
    while (true) {
      if (!currentScope || visited.has(currentScope))
        break
      for (const ref of currentScope.variables) {
        if (ref.name === node.name)
          return
      }
      visited.add(currentScope)
      currentScope = currentScope.upper
    }

    importedNames.add(node.name)
    onImportEntry(node, item)
  }

  const listeners: RuleListener = {
    ImportDeclaration(node) {
      node.specifiers.forEach((s) => {
        importedNames.add(s.local.name.toLowerCase())
      })
    },
    'Program:exit': function () {
      const vueTemplate = (context.sourceCode.ast as any).templateBody
      if (!vueTemplate)
        return

      function visit(node?: any): void {
        if (!node)
          return

        switch (node.type) {
          case 'VElement': {
            for (const child of node.children)
              visit(child)

            if (htmlTags.includes(node.name))
              return

            checkId(node)
            return
          }
          case 'VAttribute':
          case 'VText':
          case 'VExpressionContainer':
            return
        }

        if ('children' in node) {
          for (const child of node.children)
            visit(child)
          return
        }

        if ('body' in node) {
          visit(node.body)
          return
        }

        {
          const { tokens, parent, range, loc, ...rest } = node
          debug('Unknown VNode', rest)
        }
      }

      visit(vueTemplate)
    },
  }

  return listeners
}
