import { defineConfig } from 'vitepress'
import { dailyLearningList, articleList, bookList } from '../metadata/metadata'
import { DAILY_LEARNING, ARTICLES_DIR } from '../metadata/scripts/update';

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

const DailyLearningSideBar = [
  {
    text: '每日一学',
    items: DailyLearning
  }
];

const ArticlesSideBar = [
  {
    text: '文章',
    items: Articles
  }
];

const BooksSideBar = [
  {
    text: '书籍',
    items: Books
  }
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/blog/',
  title: "陈大思博客", // 网站标题
  description: "陈大思的博客", // 网站描述
  themeConfig: { // 主题配置
    search: {
      provider: 'local'
    },
    footer: {
      copyright: '陈大思版权所有 Copyright © 2024 创作不易请尊重他人劳动成果，未经允许禁止转载',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [ // 导航栏的配置
      { text: '首页', link: '/' },
      { text: '每日一学', link: DailyLearning[0].link, activeMatch: `/${DAILY_LEARNING}/` },
      { text: '文章', link: Articles[0].link, activeMatch: `/${ARTICLES_DIR}/` },
    ],

    sidebar: {
      // 侧边栏配置
      '/dailyLearning/': DailyLearningSideBar,
      '/articles/': ArticlesSideBar,
      '/books/': BooksSideBar,
    },

    socialLinks: [ // 友链的配置，也可以叫做社交链接
      { icon: 'github', link: 'https://github.com/c37csq' }
    ]
  },
})
