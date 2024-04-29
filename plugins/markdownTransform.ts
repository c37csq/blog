import type { Plugin } from 'vite';
import { articles } from '../metadata/metadata'

const Articles = articles.map(v => ({
  text: v.articleTitle,
  link: v.articlePath
}))

export function MarkdownTransform(): Plugin {
  return {
    name: 'blog-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/))
        return null
      code = code.replace(/ARTICLE_PAGE/g, Articles[0].link);
      return code;
    },
  }
}