export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar: string | null;
  bio: string;
  role: string;
  socialLinks: { label: string; url: string }[];
}

export interface ArticleSource {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown, rendered without raw HTML. */
  content: string;
  coverImage: string | null;
  coverAlt: string;
  authorId: string;
  category: string;
  tags: string[];
  publishedAt: string | null;
  updatedAt: string | null;
  /** Minutes; null calculates it from the content. */
  readingTime: number | null;
  featured: boolean;
  status: 'draft' | 'published';
  seoTitle: string | null;
  seoDescription: string | null;
  /** Transparently identifies the included editorial examples. */
  sample?: boolean;
}

export interface Article extends Omit<ArticleSource, 'authorId' | 'readingTime' | 'publishedAt'> {
  author: Author;
  readingTime: number;
  publishedAt: string;
}

export type ArticleSummary = Omit<Article, 'content'>;
