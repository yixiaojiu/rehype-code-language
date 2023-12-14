# rehype-code-language

Remark plugin to add a language span element to code blocks.

## Installation

```sh
npm install rehype-code-language
```

## Example

```js
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeCodeLanguage from 'rehype-code-language'

const markdown = `
  \`\`\`js
  let a = 1;

  console.log(a);
  \`\`\`
  `

const result = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
  .use(rehypeCodeLanguage)
  .process(markdown)
```

The rendered HTML will be

```html
<pre><span class="language">js</span><code class="language-js">let a = 1;

console.log(a);
</code></pre>
```

## Options

`defaultLanguage`: display default language, if you don't specify language

For example:

```js
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeCodeLanguage from 'rehype-code-language'

const markdown = `
  \`\`\`
  some text
  \`\`\`
  `

const result = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
  .use(rehypeCodeLanguage, { defaultLanguage: 'txt' })
  .process(markdown)
```

The rendered HTML will be

```html
<pre><span class="language">txt</span><code>some text
</code></pre>
```
