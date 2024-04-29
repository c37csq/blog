import { MarkdownTransform } from './plugins/markdownTransform';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    // custom
    MarkdownTransform(),
  ],
})