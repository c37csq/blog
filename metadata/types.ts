export interface Item {
  title: string;
  path: string;
  lastUpdated: number;
}

export interface ArticleItem extends Item {}

export interface BookItem extends Item {}

export interface DailyLearningItem extends Item {}

export interface PackageIndexes {
  dailyLearning: DailyLearningItem[];
  articles: ArticleItem[];
  books: BookItem[];
}

