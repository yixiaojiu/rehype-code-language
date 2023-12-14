import { visit } from 'unist-util-visit'
import type { Root, Element } from 'hast'

export interface Options {
  // display default language, if you don't specify language
  defaultLanguage: string
}

const rehypeCodeLanguage = (
  { defaultLanguage }: Options = { defaultLanguage: '' }
) => {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (node.tagName !== 'code') {
        return
      }
      const classNames = node.properties?.className as string[]
      const classNamelanguage = classNames?.find((className) =>
        className.startsWith('language-')
      )
      const language = classNamelanguage
        ? classNamelanguage.slice(9)
        : defaultLanguage

      if (!language) {
        return
      }
      const languageElement: Element = {
        type: 'element',
        children: [{ type: 'text', value: language }],
        tagName: 'span',
        properties: {
          className: ['language'],
        },
      }

      parent.children.splice(index, 0, languageElement)

      // Skips this node (span) and the next node (code)
      return index + 2
    })
  }
}

export default rehypeCodeLanguage
