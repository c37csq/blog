export interface ArticleItem {
  title: string;
  path: string;
}

export interface DailyLearningItem {
  title: string;
  path: string;
}

export interface PackageIndexes {
  dailyLearning: DailyLearningItem[];
  articles: ArticleItem[]
}

