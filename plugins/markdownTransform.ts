import type { Plugin } from 'vite';
import { dailyLearningList, articleList, bookList } from '../metadata/metadata'

const DailyLearning = dailyLearningList.map(v => ({
  text: v.title,
  link: v.path
}));

const Articles = articleList.map(v => ({
  text: v.title,
  link: v.path
}));

const Books = bookList.map(v => ({
  text: v.title,
  link: v.path
}));

export function MarkdownTransform(): Plugin {
  return {
    name: 'blog-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/\.md\b/))
        return null
      code = code
        .replace(/DAILY_LEARNING/g, DailyLearning[0].link)
        .replace(/ARTICLE_PAGE/g, Articles[0].link)
        .replace(/BOOK_PAGE/g, Books[0].link);
      return code;
    },
  }
}