import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import { getPublishedArticles, validateArticles } from '../src/lib/journal/content';
import { filterArticles, relatedArticles, summarize } from '../src/lib/journal/queries';
import type { ArticleSource } from '../src/lib/journal/types';

const sources: ArticleSource[] = fs.readdirSync('src/content/journal/articles').filter((file) => file.endsWith('.json')).map((file) => JSON.parse(fs.readFileSync(path.join('src/content/journal/articles', file), 'utf8')));
const articles = getPublishedArticles(new Date('2030-01-01T00:00:00Z'));

test('public content excludes drafts, future dates, and full bodies from summaries', () => {
  assert(articles.length > 0);
  assert(articles.every((article) => article.status === 'published'));
  assert(!JSON.stringify(articles).includes('draft-notebook'));
  assert.deepEqual(getPublishedArticles(new Date('2000-01-01')), []);
  assert(articles.every((article) => !('content' in summarize(article))));
  assert(articles.every((article) => article.author.name === 'Cindy Kandie'));
  assert(articles.every((article) => article.readingTime >= 1));
});

test('metadata validation catches broken relationships and publication mistakes', () => {
  const source = sources.find((article) => article.status === 'published')!;
  assert.throws(() => validateArticles([source, source]), /duplicate/);
  assert.throws(() => validateArticles([{ ...source, authorId: 'unknown' }]), /unknown author/);
  assert.throws(() => validateArticles([{ ...source, publishedAt: null }]), /publishedAt/);
  assert.throws(() => validateArticles([{ ...source, publishedAt: 'not a date' }]), /ISO UTC/);
  assert.throws(() => validateArticles([{ ...source, status: 'private' as 'draft' }]), /invalid status/);
  assert.throws(() => validateArticles([{ ...source, slug: '../unsafe' }]), /slug/);
  assert.throws(() => validateArticles([{ ...source, readingTime: 0 }]), /readingTime/);
  assert.doesNotThrow(() => validateArticles([{ ...source, coverImage: null }]));
  assert.doesNotThrow(() => validateArticles([{ ...source, status: 'draft', publishedAt: null }]));
});

test('search combines words, category, tags, and author without mutating content', () => {
  const before = JSON.stringify(articles);
  const article = articles[0];
  assert(filterArticles(articles, ' CINDY   Kandie ').length > 0);
  assert.equal(filterArticles(articles, 'no-such-search-term').length, 0);
  assert(filterArticles(articles, '', article.category, article.tags[0]).every((result) => result.category === article.category && result.tags.includes(article.tags[0])));
  assert.equal(JSON.stringify(articles), before);
});

test('related articles exclude self and gracefully handle zero matches', () => {
  const article = articles[0];
  assert(relatedArticles(article, articles).every((result) => result.id !== article.id));
  assert.deepEqual(relatedArticles(article, [article]), []);
  assert.deepEqual(relatedArticles({ ...article, category: 'Unrelated', tags: [] }, articles), []);
  assert(relatedArticles(article, articles, 1).length <= 1);
});

test('long content, long titles, many tags, and missing covers stay valid', () => {
  const source = sources[0];
  const long = { ...source, title: 'A very long technical title '.repeat(20), content: 'A paragraph about an experiment.\n\n'.repeat(500), tags: Array.from({ length: 50 }, (_, index) => `Topic ${index}`), coverImage: null };
  assert.doesNotThrow(() => validateArticles([long]));
});

test('published local covers exist and support social previews', () => {
  for (const article of articles) {
    if (article.coverImage) assert(fs.existsSync(path.join('public', article.coverImage)), article.coverImage);
  }
});

test('article renderer supports rich writing and excludes executable HTML', async () => {
  const { createElement } = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { default: ArticleContent } = await import('../src/components/journal/ArticleContent');
  const html = renderToStaticMarkup(createElement(ArticleContent, { content: '# Section\n\nA **bold** and *italic* paragraph with `code`.\n\n> A quote\n\n1. First\n2. Second\n\n- Item\n\n```js\nconst value = 1;\n```\n\n![Diagram](/image.png "A caption")\n\n---\n\n[Unsafe](javascript:alert(1))\n\n<script>alert("unsafe")</script>' }));
  for (const tag of ['h2', 'p', 'strong', 'em', 'blockquote', 'ol', 'ul', 'pre', 'code', 'figure', 'figcaption', 'hr']) assert.match(html, new RegExp(`<${tag}[ >/]`));
  assert(!html.includes('<h1'));
  assert(!html.includes('<script'));
  assert(!html.includes('javascript:'));
  assert(html.includes('A caption'));
});
