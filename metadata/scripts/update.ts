import type {ArticleItem, DailyLearningItem, PackageIndexes} from '../types';
import { resolve, join } from 'path';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';

export const DAILY_LEARNING = 'dailyLearning';

export const ARTICLES_DIR = 'articles';

export const DIR_DAILY_LEARNING = resolve(__dirname, `../../${DAILY_LEARNING}`);
export const DIR_ARTICLES = resolve(__dirname, `../../${ARTICLES_DIR}`);

export const DIR_PACKAGE = resolve(__dirname, '..')


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
function readFileContent(mdFiles: string[], dir: string): DailyLearningItem[] {
  const fileList: ArticleItem[] = [];
  for (let i = 0; i < mdFiles.length; i++) {
    let path = mdFiles[i];
    let content = readFileSync(path, 'utf-8');
    const title = content.split('\r')[0].replace(/\#*\s/, '');
    fileList.push({
      title: title,
      path: transformPath(path, dir)
    })
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

async function readArticleData() {
  const indexJsonData: PackageIndexes = {
    dailyLearning: [],
    articles: []
  };
  // 每日一学
  const dailyLearningFile = readFile(DIR_DAILY_LEARNING);
  const dailyLearningMarkdownFiles = dailyLearningFile.filter((filename) => filename.endsWith('.md'));
  const dailyLearningList = readFileContent(dailyLearningMarkdownFiles, DAILY_LEARNING);
  // 文章
  const articlesFile = readFile(DIR_ARTICLES);
  const articlesMarkdownFiles = articlesFile.filter((filename) => filename.endsWith('.md'));
  const articlesList = readFileContent(articlesMarkdownFiles, ARTICLES_DIR);
  indexJsonData.dailyLearning = dailyLearningList;
  indexJsonData.articles = articlesList;
  return indexJsonData;
}

async function run() {
  const indexes = await readArticleData();
  writeFileSync(join(DIR_PACKAGE, 'index.json'), JSON.stringify(indexes, null, 2));
}

run()