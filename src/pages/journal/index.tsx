import { useState } from 'react';
import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import ArticleCard from '@/components/journal/ArticleCard';
import JournalSeo from '@/components/journal/JournalSeo';
import { journalConfig } from '@/content/journal/config';
import { getPublishedArticles } from '@/lib/journal/content';
import { filterArticles, summarize } from '@/lib/journal/queries';
import type { ArticleSummary } from '@/lib/journal/types';

export default function Journal({ articles }: { articles: ArticleSummary[] }) {
  const router = useRouter();
  const query = typeof router.query.q === 'string' ? router.query.q : '';
  const category = typeof router.query.category === 'string' ? router.query.category : '';
  const tag = typeof router.query.tag === 'string' ? router.query.tag : '';
  const [visible, setVisible] = useState(journalConfig.pageSize);
  const categories = [...new Set(articles.map((article) => article.category))].sort();
  const tags = [...new Set(articles.flatMap((article) => article.tags))].sort();
  const filtered = filterArticles(articles, query, category, tag);
  const isFiltered = Boolean(query || category || tag);
  const featured = !isFiltered ? articles.find((article) => article.featured) : undefined;
  const remaining = filtered.filter((article) => article.id !== featured?.id);

  function updateFilter(key: string, value: string) {
    const next = { ...router.query };
    if (value) next[key] = value;
    else delete next[key];
    setVisible(journalConfig.pageSize);
    void router.replace({ pathname: '/journal', query: next }, undefined, { shallow: true, scroll: false });
  }
  function clearFilters() {
    setVisible(journalConfig.pageSize);
    void router.replace('/journal', undefined, { shallow: true, scroll: false });
  }

  return <Layout>
    <JournalSeo />
    <main className="journal">
      <div className="journal-shell">
        <header className="journal-hero">
          <div className="journal-hero-kicker"><span className="journal-eyebrow">{journalConfig.name}</span><span className="journal-studio-note">{journalConfig.eyebrow}</span></div>
          <h1>{journalConfig.heading}</h1>
          <div className="journal-hero-bottom"><p>{journalConfig.description}</p><span className="journal-hero-mark" aria-hidden="true">[ Thinking out loud ↗ ]</span></div>
        </header>

        {featured && <section className="journal-featured" aria-label="Featured article">
          <div className="journal-section-label"><span className="journal-eyebrow">The featured story</span><span aria-hidden="true">01 / A closer look</span></div>
          <ArticleCard article={featured} featured />
        </section>}

        <section className="journal-discovery" aria-labelledby="journal-stories-heading">
          <div className="journal-discovery-heading"><div><span className="journal-eyebrow">Explore the Blogs</span><h2 id="journal-stories-heading">Follow your curiosity.</h2></div>
            <div className="journal-search"><label htmlFor="journal-search" className="sr-only">Search articles</label><span aria-hidden="true">⌕</span><input id="journal-search" type="search" className="ix-input" placeholder="Search ideas, topics, stories…" value={query} onChange={(event) => updateFilter('q', event.target.value)} /></div>
          </div>
          <div className="journal-filters">
            <div className="journal-tags" role="group" aria-label="Filter by category"><button className="journal-pill" aria-pressed={!category} onClick={() => updateFilter('category', '')}>All topics</button>{categories.map((item) => <button className="journal-pill" aria-pressed={category === item} key={item} onClick={() => updateFilter('category', item)}>{item}</button>)}</div>
            <div className="journal-tag-select"><label htmlFor="journal-tag">Tag</label><select className="ix-input" id="journal-tag" value={tag} onChange={(event) => updateFilter('tag', event.target.value)}><option value="">All tags</option>{tags.map((item) => <option key={item}>{item}</option>)}</select></div>
          </div>
          <div className="journal-results-bar"><p className="journal-meta" role="status">{isFiltered ? `${filtered.length} ${filtered.length === 1 ? 'story' : 'stories'} found` : `${articles.length} ${articles.length === 1 ? 'story' : 'stories'} in Blogs`}</p>{isFiltered && <button className="journal-text-button" onClick={clearFilters}>Clear filters ↗</button>}</div>
          {remaining.length > 0 ? <div className="journal-grid">{remaining.slice(0, visible).map((article) => <ArticleCard key={article.id} article={article} />)}</div> : !featured && <div className="journal-empty"><h3>{isFiltered ? 'A little further off the beaten path.' : 'The next idea starts here.'}</h3><p>{isFiltered ? 'No stories match these filters. Try another topic or a different search.' : 'New stories are on their way. Come back soon.'}</p>{isFiltered && <button className="journal-pill" onClick={clearFilters}>Show all stories</button>}</div>}
          {remaining.length > visible && <div className="journal-load-more"><button className="journal-pill" onClick={() => setVisible((count) => count + journalConfig.pageSize)}>Load more stories <span aria-hidden="true">↓</span></button><p className="journal-meta">Showing {Math.min(visible, remaining.length)} of {remaining.length}</p></div>}
        </section>
        <aside className="journal-endnote"><span className="journal-eyebrow">Always a work in progress</span><p>Good questions lead to interesting places.</p><span className="journal-meta">Built with curiosity. Shared from Intellixar.</span></aside>
      </div>
    </main>
  </Layout>;
}

export const getStaticProps: GetStaticProps = async () => ({ props: { articles: getPublishedArticles().map(summarize) } });
