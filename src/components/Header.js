import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ToggleButton from './ThemeBtn';
import { productCategories } from './products/categories';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Products', href: '/projects' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blogs', href: '/journal' },
  //{ label: 'Labs', href: '/labs' },
  { label: 'Work With Us', href: '/work-with-us' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef(null);
  const productsToggleRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (!productsOpen) return;
    const closeOutside = (event) => {
      if (!productsRef.current?.contains(event.target)) setProductsOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [productsOpen]);

  const isActive = (href) => {
    if (href.startsWith('#')) return false;
    if (href === '/projects' && router.pathname === '/ai-radar') return true;
    return router.pathname === href || router.pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'nav-glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <span
            className="text-xl font-black tracking-tight hover:opacity-85 transition-opacity"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
          >
            Intelli
            <span
              style={{
                background: 'linear-gradient(90deg, #7c3aed, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Xar
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => link.href === '/projects' ? (
            <div key={link.label} className={styles.products} ref={productsRef}
              onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setProductsOpen(false); }}
              onKeyDown={(event) => {
                if (event.key === 'Escape' && productsOpen) {
                  setProductsOpen(false);
                  productsToggleRef.current?.focus();
                }
              }}>
              <Link href={link.href} className={styles.parentLink} style={{ color: isActive(link.href) ? 'var(--label-cyan)' : 'var(--text-secondary)' }}>{link.label}</Link>
              <button ref={productsToggleRef} className={styles.toggle} aria-label="Product categories" aria-expanded={productsOpen} aria-controls="desktop-product-categories" onClick={() => setProductsOpen(!productsOpen)}>
                <span aria-hidden="true">{productsOpen ? '−' : '⌄'}</span>
              </button>
              {productsOpen && <div id="desktop-product-categories" className={styles.dropdown}>
                {Object.values(productCategories).map((category) => <Link key={category.href} href={category.href} aria-current={isActive(category.href) ? 'page' : undefined}>
                  <span>{category.label}</span><small>{category.heading}</small>
                </Link>)}
              </div>}
            </div>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                isActive(link.href)
                  ? 'text-white bg-white/8'
                  : 'hover:bg-white/5'
              }`}
              style={{ color: isActive(link.href) ? '#22d3ee' : 'var(--text-secondary)' }}
              onMouseEnter={(e) => { if (!isActive(link.href)) e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={(e) => { if (!isActive(link.href)) e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ToggleButton />

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg transition-colors hover:bg-white/5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`block w-5 h-0.5 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--text-secondary)' }} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: 'var(--text-secondary)' }} />
            <span className={`block w-5 h-0.5 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--text-secondary)' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden border-t px-5 py-4 flex flex-col gap-1"
          style={{
            borderColor: 'var(--border-card)',
            background: 'var(--nav-bg)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <React.Fragment key={link.label}>
            <Link
              key={link.label}
              href={link.href}
              className="px-3 py-2.5 text-sm font-medium rounded-lg transition-colors"
              style={{
                color: isActive(link.href) ? '#22d3ee' : 'var(--text-secondary)',
                background: isActive(link.href) ? 'rgba(34,211,238,0.06)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
            {link.href === '/projects' && <div className={styles.mobileCategories}>
              {Object.values(productCategories).map((category) => <Link key={category.href} href={category.href} aria-current={isActive(category.href) ? 'page' : undefined}>{category.label}</Link>)}
            </div>}
            </React.Fragment>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
