import type { Article, ArticleSummary } from './types';

export function summarize(article: Article): ArticleSummary {
  const { content: _content, ...summary } = article;
  return summary;
}

export function filterArticles(articles: ArticleSummary[], query = '', category = '', tag = '') {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return articles.filter((article) => {
    const text = [article.title, article.excerpt, article.author.name, article.category, ...article.tags].join(' ').toLocaleLowerCase();
    return (!category || article.category === category) && (!tag || article.tags.includes(tag)) && words.every((word) => text.includes(word));
  });
}

export function relatedArticles(article: ArticleSummary, articles: ArticleSummary[], limit = 3) {
  return articles.filter((candidate) => candidate.id !== article.id)
    .map((candidate) => ({
      article: candidate,
      score: Number(candidate.category === article.category) * 2 + candidate.tags.filter((tag) => article.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.article.publishedAt.localeCompare(a.article.publishedAt))
    .slice(0, limit).map(({ article: candidate }) => candidate);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
}
