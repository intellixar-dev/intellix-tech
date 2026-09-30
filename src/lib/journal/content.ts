// Server-only repository. Only call this module from getStaticProps/getStaticPaths.
import fs from 'node:fs';
import path from 'node:path';
import { authors } from '../../content/journal/authors';
import type { Article, ArticleSource } from './types';

export function validateArticles(sources: ArticleSource[]) {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  for (const article of sources) {
    const fail = (message: string): never => { throw new Error(`Journal: ${article.slug || 'unnamed article'}: ${message}`); };
    for (const field of ['id', 'slug', 'title', 'excerpt', 'content', 'authorId', 'category'] as const) {
      if (typeof article[field] !== 'string' || !article[field].trim()) fail(`${field} is required`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) fail('slug must be lowercase and hyphenated');
    if (ids.has(article.id) || slugs.has(article.slug)) fail('duplicate id or slug');
    ids.add(article.id); slugs.add(article.slug);
    if (!authors.some((author) => author.id === article.authorId)) fail('unknown authorId');
    if (!['draft', 'published'].includes(article.status)) fail('invalid status');
    if (!Array.isArray(article.tags) || article.tags.some((tag) => typeof tag !== 'string' || !tag.trim())) fail('tags must be nonempty strings');
    if (typeof article.featured !== 'boolean') fail('featured must be boolean');
    for (const field of ['publishedAt', 'updatedAt'] as const) {
      const value = article[field];
      if (value !== null && (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T.*Z$/.test(value) || !Number.isFinite(Date.parse(value)))) fail(`${field} must be an ISO UTC date or null`);
    }
    if (article.status === 'published' && !article.publishedAt) fail('publishedAt is required to publish');
    if (article.updatedAt && article.publishedAt && article.updatedAt < article.publishedAt) fail('updatedAt precedes publication');
    if (article.readingTime !== null && (!Number.isInteger(article.readingTime) || article.readingTime < 1)) fail('readingTime must be a positive integer or null');
    if (typeof article.coverAlt !== 'string') fail('coverAlt must be a string');
    for (const field of ['coverImage', 'seoTitle', 'seoDescription'] as const) {
      if (article[field] !== null && typeof article[field] !== 'string') fail(`${field} must be a string or null`);
    }
    if (article.coverImage && !/^\/(?!\/)/.test(article.coverImage)) fail('coverImage must be a local public path');
    if (article.sample !== undefined && typeof article.sample !== 'boolean') fail('sample must be boolean');
  }
  return sources;
}

export function getPublishedArticles(now = new Date()): Article[] {
  const directory = path.join(process.cwd(), 'src/content/journal/articles');
  const sources = fs.readdirSync(directory).filter((file) => file.endsWith('.json')).map((file) => {
    try { return JSON.parse(fs.readFileSync(path.join(directory, file), 'utf8')) as ArticleSource; }
    catch { throw new Error(`Journal: cannot parse ${file}`); }
  });
  return validateArticles(sources)
    .filter((article) => article.status === 'published' && new Date(article.publishedAt!) <= now)
    .map(({ authorId, ...article }) => ({
      ...article,
      publishedAt: article.publishedAt!,
      author: authors.find((author) => author.id === authorId)!,
      readingTime: article.readingTime ?? Math.max(1, Math.ceil(article.content.trim().split(/\s+/).length / 220)),
    }))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
}
