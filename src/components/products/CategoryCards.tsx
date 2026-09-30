import Link from 'next/link';
import { productCategories } from './categories';
import styles from './Products.module.css';

export default function CategoryCards() {
  return <div className={styles.grid}>
    {Object.entries(productCategories).map(([type, category]) => (
      <section key={type} className={`glass-card rounded-2xl ${styles.category}`} data-product-type={type}>
        <p className={styles.eyebrow}>{category.label}</p>
        <h2>{category.heading}</h2>
        <p>{category.description}</p>
        <Link className={styles.textLink} href={category.href}>Explore {category.label} <span aria-hidden="true">↗</span></Link>
      </section>
    ))}
  </div>;
}
