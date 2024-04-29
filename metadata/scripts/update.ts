import type { ArticleItem, PackageIndexes } from '../types';
import { resolve, join } from 'path';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';

export const DIR_ARTICLES = resolve(__dirname, '../../articles');

export const DIR_PACKAGE = resolve(__dirname, '..')

const ARTICLE_DIR = 'articles';

/**
 * Recursively reads all files within a directory and its subdirectories.
 * @param baseDir The base directory to start reading files from.
 * @returns An array of file paths.
 */
function readFile(baseDir: string): string[] {
  const files = readdirSync(baseDir);
  const fileList: string[] = [];
  for (let i = 0; i < files.length; i++) {
    let path = join(baseDir, files[i]);
    let stat = statSync(path);
    if (stat.isFile()) {
      fileList.push(path);
    } else {
      fileList.push(...readFile(path)); // Recursively read files in subdirectories.
    }
  }
  return fileList;
}

/**
 * Reads the content of all .vue files and extracts their data-name attribute value.
 * @param vueFiles An array of file paths to .vue files.
 * @returns An array of objects containing the file path and data-name attribute value.
 */
function readFileContent(mdFiles: string[]): ArticleItem[] {
  const fileList: ArticleItem[] = [];
  for (let i = 0; i < mdFiles.length; i++) {
    let path = mdFiles[i];
    let content = readFileSync(path, 'utf-8');
    const title = content.split('\r')[0].replace(/\#*\s/, '');
    fileList.push({
      articleTitle: title,
      articlePath: transformPath(path)
    })
  }
  return fileList;
}

/**
 * Transforms a file path to be relative to the VUE_PAGE_DIR directory.
 * @param path The file path to transform.
 * @returns The transformed file path.
 */
function transformPath(path: string): string {
  const index = path.indexOf(ARTICLE_DIR);
  let result;
  if (index !== -1) {
    result = path.slice(index - 1).replace('index.md', '');
  } else {
    result = path;
  }
  return result.replace(/\\/g, '/');
}

async function readArticleData() {
  const indexJsonData: PackageIndexes = {
    articles: []
  };
  const fileList = readFile(DIR_ARTICLES);
  const markdownFiles = fileList.filter((filename) => filename.endsWith('.md'));
  const resList = readFileContent(markdownFiles);
  indexJsonData.articles = resList;
  return indexJsonData;
}

async function run() {
  const indexes = await readArticleData();
  writeFileSync(join(DIR_PACKAGE, 'index.json'), JSON.stringify(indexes, null, 2));
}

run()