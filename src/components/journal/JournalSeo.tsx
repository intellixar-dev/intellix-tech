import Head from 'next/head';
import { absoluteUrl, journalConfig } from '@/content/journal/config';
import type { Article } from '@/lib/journal/types';

export default function JournalSeo({ article }: { article?: Article }) {
  const title = article ? `${article.seoTitle || article.title} | ${journalConfig.name}` : `${journalConfig.name} — ${journalConfig.heading}`;
  const description = article?.seoDescription || article?.excerpt || journalConfig.description;
  const url = absoluteUrl(article ? `/journal/${article.slug}` : '/journal');
  const image = absoluteUrl(article?.coverImage || journalConfig.defaultImage);
  const structuredData = article ? {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title,
    description, image, datePublished: article.publishedAt, dateModified: article.updatedAt || article.publishedAt,
    author: { '@type': 'Person', name: article.author.name, ...(article.author.socialLinks.length ? { sameAs: article.author.socialLinks.map((link) => link.url) } : {}) },
    publisher: { '@type': 'Organization', name: 'Intellixar', url: journalConfig.siteUrl },
    mainEntityOfPage: url, articleSection: article.category, keywords: article.tags.join(', '),
  } : {
    '@context': 'https://schema.org', '@type': 'Blog', name: journalConfig.name, description, url,
    publisher: { '@type': 'Organization', name: 'Intellixar', url: journalConfig.siteUrl },
  };
  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} key="description" />
    <link rel="canonical" href={url} key="canonical" />
    <meta property="og:type" content={article ? 'article' : 'website'} key="og:type" />
    <meta property="og:site_name" content={journalConfig.name} key="og:site_name" />
    <meta property="og:title" content={title} key="og:title" />
    <meta property="og:description" content={description} key="og:description" />
    <meta property="og:url" content={url} key="og:url" />
    <meta property="og:image" content={image} key="og:image" />
    <meta property="og:image:alt" content={article?.coverAlt || journalConfig.name} key="og:image:alt" />
    <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
    <meta name="twitter:title" content={title} key="twitter:title" />
    <meta name="twitter:description" content={description} key="twitter:description" />
    <meta name="twitter:image" content={image} key="twitter:image" />
    <meta name="twitter:image:alt" content={article?.coverAlt || journalConfig.name} key="twitter:image:alt" />
    {article && <>
      <meta name="author" content={article.author.name} key="author" />
      <meta property="article:author" content={article.author.name} key="article:author" />
      <meta property="article:published_time" content={article.publishedAt} key="article:published_time" />
      <meta property="article:modified_time" content={article.updatedAt || article.publishedAt} key="article:modified_time" />
      <meta property="article:section" content={article.category} key="article:section" />
      {article.tags.map((tag) => <meta property="article:tag" content={tag} key={`tag:${tag}`} />)}
    </>}
    <script key="journal-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
  </Head>;
}
