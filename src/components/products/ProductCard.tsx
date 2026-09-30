import { useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { productCategories } from './categories';
import styles from './Products.module.css';

function ProductLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith('/')
    ? <Link href={href} className={styles.button}>{children}</Link>
    : <a href={href} className={styles.button} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>;
}

export default function ProductCard({ product, compact = false, wide = false }: { product: Product; compact?: boolean; wide?: boolean }) {
  const [imageFailed, setImageFailed] = useState(false);
  const category = productCategories[product.type];
  return <article className={`glass-card rounded-2xl ${styles.card} ${product.featured ? styles.featured : ''} ${wide ? styles.wide : ''}`} data-product-type={product.type} data-product-id={product.id} style={{ '--product-color': product.accent } as React.CSSProperties}>
    {(!compact || wide) && product.image && !imageFailed && <div className={styles.cover}>
      {/* Existing local previews retain their original dimensions and crop. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={product.image} alt={`${product.title} preview`} onError={() => setImageFailed(true)} loading={product.featured ? 'eager' : 'lazy'} />
    </div>}
    <div className={styles.cardBody}>
      <div className={styles.labels}>
        <span className={styles.eyebrow}>{category.singular}</span>
        {product.status && <span className={styles.badge}>{product.status}</span>}
        {product.featured && <span className={styles.badge}>Flagship</span>}
      </div>
      <h3>{product.title}</h3>
      {product.category && <p className={styles.kind}>{product.category}</p>}
      <p>{compact ? product.description : product.catalogueDescription || product.description}</p>
      {product.type === 'client' && <dl className={styles.details}>
        {product.clientName && <div><dt>Client</dt><dd>{product.clientName}</dd></div>}
        {!compact && product.industry && <div><dt>Industry</dt><dd>{product.industry}</dd></div>}
        {!compact && product.projectType && <div><dt>Project type</dt><dd>{product.projectType}</dd></div>}
        {!compact && product.year && <div><dt>Year</dt><dd>{product.year}</dd></div>}
      </dl>}
      {!compact && !!product.technologies?.length && <ul className={styles.tags} aria-label="Technologies">
        {product.technologies.map((technology) => <li key={technology}>{technology}</li>)}
      </ul>}
      {compact && !!product.features?.length && <ul className={styles.tags} aria-label="Features">
        {product.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
      </ul>}
      {(product.href || product.caseStudyUrl) && <div className={styles.actions}>
        {product.href && <ProductLink href={product.href}>{product.ctaLabel || (product.href.startsWith('/') ? 'View Product' : product.type === 'client' ? 'Visit Product' : 'Try Now')}</ProductLink>}
        {product.caseStudyUrl && <ProductLink href={product.caseStudyUrl}>Read Case Study</ProductLink>}
      </div>}
    </div>
  </article>;
}
