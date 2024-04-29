import { defineConfig } from 'vitepress'
import { articles } from '../metadata/metadata'

const Articles = articles.map(v => ({
  text: v.articleTitle,
  link: v.articlePath
}))

const ArticleSideBar = [
  {
    text: '文章',
    items: Articles
  }
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "陈大思博客", // 网站标题
  description: "陈大思的博客", // 网站描述
  themeConfig: { // 主题配置
    footer: {
      copyright: '陈大思版权所有 Copyright © 2024 创作不易请尊重他人劳动成果，未经允许禁止转载',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [ // 导航栏的配置
      { text: '首页', link: '/' },
      { text: '文章', link: Articles[0].link },
      { text: 'Markdown示例', link: '/markdown-examples' }
    ],

    sidebar: {
      // 侧边栏配置
      '/articles/': ArticleSideBar
    },

    socialLinks: [ // 友链的配置，也可以叫做社交链接
      { icon: 'github', link: 'https://github.com/c37csq' }
    ]
  },
})
