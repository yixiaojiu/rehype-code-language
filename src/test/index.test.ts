import { test, expect } from 'vitest'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeCodeLanguage from '../index'

test('render span element with the content of js', async () => {
  const md = `
  # Some title
  
  \`\`\`js
  let a = 1;

  console.log(a);
  \`\`\`
  
  Some block of text
  `

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeCodeLanguage)
    .process(md)

  expect(result.value).toContain('<span class="language">js</span>')
  expect(result.value).matchSnapshot()
})

test("don't render span element when there is no language in code block", async () => {
  const md = `
  # Some title
  
  \`\`\`
  some text
  \`\`\`
  
  Some block of text
  `

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeCodeLanguage)
    .process(md)

  expect(result.value).not.toContain('<span class="language"></span>')
})

test('render span element with default content', async () => {
  const md = `
  # Some title
  
  \`\`\`
  some text
  \`\`\`
  
  Some block of text
  `

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeCodeLanguage, { defaultLanguage: 'txt' })
    .process(md)

  expect(result.value).toContain('<span class="language">txt</span>')
  expect(result.value).matchSnapshot()
})
