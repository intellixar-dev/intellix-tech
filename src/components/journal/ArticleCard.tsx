import Link from 'next/link';
import type { ArticleSummary } from '@/lib/journal/types';
import { formatDate } from '@/lib/journal/queries';
import AuthorDetails from './AuthorDetails';
import CoverImage from './CoverImage';

export default function ArticleCard({ article, featured = false }: { article: ArticleSummary; featured?: boolean }) {
  return (
    <article className={`journal-card glass-card ${featured ? 'journal-card-featured' : ''}`}>
      <Link href={`/journal/${article.slug}`} className="journal-card-link">
        <CoverImage src={article.coverImage} alt={article.coverAlt} priority={featured} />
        <div className="journal-card-body">
          <div className="journal-card-topline"><span className="journal-eyebrow">{article.category}</span>{article.sample && <span className="journal-sample-label">Sample article</span>}</div>
          <h2>{article.title}</h2>
          <p className="journal-card-excerpt">{article.excerpt}</p>
          <div className="journal-card-bottom">
            <AuthorDetails author={article.author} />
            <div className="journal-meta"><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span> · {article.readingTime} min read</span></div>
          </div>
          {featured && <span className="journal-read-link">Read the story <span aria-hidden="true">↗</span></span>}
        </div>
      </Link>
    </article>
  );
}
