import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { products, type ProductType } from '@/data/products';
import CategoryCards from './CategoryCards';
import ProductCard from './ProductCard';
import { productCategories } from './categories';
import styles from './Products.module.css';

export default function ProductsPage({ type }: { type?: ProductType }) {
  const category = type ? productCategories[type] : undefined;
  const title = category ? `${category.label} | Intellixar` : 'Products | Intellixar';
  const description = category?.summary || 'From our own intelligent products to digital experiences built for clients, explore what Intellixar is building.';
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://intellixar.vercel.app').replace(/\/$/, '');
  const url = `${origin}${category?.href || '/projects'}`;
  const types: ProductType[] = type ? [type] : ['intellixar', 'client'];

  return <Layout>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <link rel="canonical" href={url} key="canonical" />
      <meta property="og:title" content={title} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:type" content="website" key="og:type" />
      <meta name="twitter:card" content="summary" key="twitter:card" />
      <meta name="twitter:title" content={title} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
    </Head>
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{category?.label || 'Products'}</p>
          <h1>{category?.heading || 'Products built with intention.'}</h1>
          <p>{description}</p>
        </header>
        <nav className={styles.tabs} aria-label="Product categories">
          <Link href="/projects" aria-current={!type ? 'page' : undefined}>All Products</Link>
          {Object.entries(productCategories).map(([key, item]) => <Link key={key} href={item.href} aria-current={type === key ? 'page' : undefined}>{item.label}</Link>)}
        </nav>
        {!type && <CategoryCards />}
        {types.map((categoryType) => {
          const items = products.filter((product) => product.type === categoryType).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
          const info = productCategories[categoryType];
          return <section key={categoryType} className={styles.section} aria-labelledby={`${categoryType}-heading`}>
            <div className={styles.sectionHeader}>
              <h2 id={`${categoryType}-heading`}>{info.label}</h2>
              <p>{info.summary}</p>
            </div>
            {items.length ? <div className={styles.grid}>{items.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className={styles.empty}>
              <h3>No {categoryType === 'client' ? 'client' : 'Intellixar'} products published yet.</h3>
              <p>New products will appear here as they are ready to share.</p>
            </div>}
          </section>;
        })}
      </div>
    </main>
  </Layout>;
}
