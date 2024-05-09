import type { PackageIndexes, Item } from '../types';
import { resolve, join } from 'path';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import Git from 'simple-git';

export const DAILY_LEARNING = 'dailyLearning';

export const ARTICLES_DIR = 'articles';

export const BOOKS_DIR = 'books';

export const DIR_DAILY_LEARNING = resolve(__dirname, `../../${DAILY_LEARNING}`);
export const DIR_ARTICLES = resolve(__dirname, `../../${ARTICLES_DIR}`);
export const DIR_BOOKS = resolve(__dirname, `../../${BOOKS_DIR}`);

export const DIR_PACKAGE = resolve(__dirname, '..');

export const DIR_ROOT = resolve(__dirname, '../..');


export const git = Git(DIR_ROOT);

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
async function readFileContent(mdFiles: string[], dir: string): Promise<Item[]> {
  const fileList: Item[] = [];
  for (let i = 0; i < mdFiles.length; i++) {
    let dirPath = mdFiles[i];
    let content = readFileSync(dirPath, 'utf-8');
    const title = /^.*$/m.exec(content)[0].replace('# ', '');
    fileList.push({
      title: title,
      path: transformPath(dirPath, dir),
      lastUpdated: +await git.raw(['log', '-1', '--format=%at', dirPath]) * 1000,
    });
  }
  return fileList;
}

/**
 * Transforms a file path to be relative to the VUE_PAGE_DIR directory.
 * @param path The file path to transform.
 * @returns The transformed file path.
 */
function transformPath(path: string, dir: string): string {
  const index = path.indexOf(dir);
  let result;
  if (index !== -1) {
    result = path.slice(index - 1).replace('index.md', '');
  } else {
    result = path;
  }
  return result.replace(/\\/g, '/');
}

async function readData() {
  const indexJsonData: PackageIndexes = {
    dailyLearning: [],
    articles: [],
    books: []
  };
  // 每日一学
  const dailyLearningFile = readFile(DIR_DAILY_LEARNING);
  const dailyLearningMarkdownFiles = dailyLearningFile.filter((filename) => filename.endsWith('.md'));
  const dailyLearningList = await readFileContent(dailyLearningMarkdownFiles, DAILY_LEARNING);
  // 文章
  const articlesFile = readFile(DIR_ARTICLES);
  const articlesMarkdownFiles = articlesFile.filter((filename) => filename.endsWith('.md'));
  const articlesList = await readFileContent(articlesMarkdownFiles, ARTICLES_DIR);
  // 书籍
  const booksFile = readFile(DIR_BOOKS);
  const booksMarkdownFiles = booksFile.filter((filename) => filename.endsWith('.md'));
  const booksList = await readFileContent(booksMarkdownFiles, BOOKS_DIR);
  indexJsonData.dailyLearning = dailyLearningList.sort((item1, item2) => item1.lastUpdated - item2.lastUpdated);
  indexJsonData.articles = articlesList.sort((item1, item2) => item1.lastUpdated - item2.lastUpdated);
  indexJsonData.books = booksList.sort((item1, item2) => item1.lastUpdated - item2.lastUpdated);
  return indexJsonData;
}

async function run() {
  const indexes = await readData();
  writeFileSync(join(DIR_PACKAGE, 'index.json'), JSON.stringify(indexes, null, 2));
}

run()