import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/journal/ArticleCard';
import ArticleContent from '@/components/journal/ArticleContent';
import AuthorDetails from '@/components/journal/AuthorDetails';
import CoverImage from '@/components/journal/CoverImage';
import JournalSeo from '@/components/journal/JournalSeo';
import ShareActions from '@/components/journal/ShareActions';
import { absoluteUrl, journalConfig } from '@/content/journal/config';
import { getPublishedArticles } from '@/lib/journal/content';
import { formatDate, relatedArticles, summarize } from '@/lib/journal/queries';
import type { Article, ArticleSummary } from '@/lib/journal/types';

interface Props {
  article: Article;
  related: ArticleSummary[];
  previous: ArticleSummary | null;
  next: ArticleSummary | null;
}

export default function BlogsArticle({ article, related, previous, next }: Props) {
  return <Layout>
    <JournalSeo article={article} />
    <main className="journal journal-reading">
      <div className="journal-shell">
        <nav className="journal-breadcrumb" aria-label="Breadcrumb"><Link href="/journal">← Back to Blogs</Link><span>{journalConfig.name}</span></nav>
        <article>
          <header className="journal-article-header">
            <Link className="journal-eyebrow" href={{ pathname: '/journal', query: { category: article.category } }}>{article.category} ↗</Link>
            <h1>{article.title}</h1>
            <p className="journal-deck">{article.excerpt}</p>
            <div className="journal-byline"><AuthorDetails author={article.author} /><div className="journal-meta"><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span> · {article.readingTime} min read</span>{article.updatedAt && article.updatedAt !== article.publishedAt && <span className="journal-updated">Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time></span>}</div></div>
          </header>
          <CoverImage src={article.coverImage} alt={article.coverAlt} priority className="journal-article-cover" />
          <div className="journal-reading-layout">
            <aside className="journal-reading-aside"><span className="journal-eyebrow">In this story</span><div className="journal-tags">{article.tags.map((tag) => <Link key={tag} className="journal-pill" href={{ pathname: '/journal', query: { tag } }}>{tag}</Link>)}</div><span className="journal-meta">{article.readingTime} minute read<br />A moment to explore.</span></aside>
            <div className="journal-reading-column">
              {article.sample && <p className="journal-sample-notice">Sample article · Starter content illustrating the blog section. Replace with your own writing before launch.</p>}
              <ArticleContent content={article.content} />
              <div className="journal-article-footer"><AuthorDetails author={article.author} expanded /><ShareActions key={article.slug} url={absoluteUrl(`/journal/${article.slug}`)} title={article.title} /></div>
            </div>
          </div>
        </article>
        {(previous || next) && <nav className="journal-pagination" aria-label="Article navigation">{previous ? <Link href={`/journal/${previous.slug}`}><span className="journal-eyebrow">← Previous story</span><strong>{previous.title}</strong></Link> : <div />}{next && <Link href={`/journal/${next.slug}`}><span className="journal-eyebrow">Next story →</span><strong>{next.title}</strong></Link>}</nav>}
        {related.length > 0 && <section className="journal-related" aria-labelledby="journal-related-heading"><div className="journal-discovery-heading"><div><span className="journal-eyebrow">Keep exploring</span><h2 id="journal-related-heading">Another thread to follow.</h2></div><Link className="journal-text-button" href="/journal">All stories ↗</Link></div><div className="journal-grid">{related.map((item) => <ArticleCard key={item.id} article={item} />)}</div></section>}
        <div className="journal-back-bottom"><Link href="/journal" className="journal-pill">← Back to Blogs</Link></div>
      </div>
    </main>
  </Layout>;
}

export const getStaticPaths: GetStaticPaths = async () => ({ paths: getPublishedArticles().map(({ slug }) => ({ params: { slug } })), fallback: false });

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const articles = getPublishedArticles();
  const index = articles.findIndex((article) => article.slug === params?.slug);
  if (index < 0) return { notFound: true };
  const article = articles[index];
  return { props: {
    article,
    related: relatedArticles(article, articles.map(summarize)),
    previous: articles[index + 1] ? summarize(articles[index + 1]) : null,
    next: articles[index - 1] ? summarize(articles[index - 1]) : null,
  } };
};
