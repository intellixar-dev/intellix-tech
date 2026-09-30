import React from 'react';
import Link from 'next/link';

const PRODUCTS = [
  { label: 'Intellixar Products', href: '/projects/intellixar' },
  { label: 'Client Products', href: '/projects/clients' },
  { label: 'AI Radar', href: '/ai-radar' },
  { label: 'Kilimo Power', href: 'https://kilimopower.co.ke', external: true },
];

const COMPANY = [
  { label: 'Blogs', href: '/journal' },
  { label: 'About', href: '#about' },
  //{ label: 'Labs', href: '#labs' },
  { label: 'Selected Work', href: '/portfolio' }
];

const CONNECT = [
  { label: 'Work With Us', href: '/work-with-us' },
  { label: 'Email', href: 'mailto:intellixar.tech@gmail.com' },
];

const LinkItem = ({ item }) => {
  const cls = "text-sm text-gray-500 hover:text-gray-200 transition-colors";
  if (item.external) {
    return <a href={item.href} target="_blank" rel="noreferrer" className={cls}>{item.label}</a>;
  }
  return <Link href={item.href} className={cls}>{item.label}</Link>;
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#040a14',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/">
              <span
                className="text-lg font-black text-white tracking-tight block mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Intelli
                <span style={{ background: 'linear-gradient(90deg,#7c3aed,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Xar
                </span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-5">
              A creative technology lab building intelligent software experiences for founders, startups, and ambitious brands.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span>📍</span>
              <span>Nairobi, Kenya</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Products</p>
            <ul className="space-y-2.5">
              {PRODUCTS.map((item) => (
                <li key={item.label}><LinkItem item={item} /></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Company</p>
            <ul className="space-y-2.5">
              {COMPANY.map((item) => (
                <li key={item.label}><LinkItem item={item} /></li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Connect</p>
            <ul className="space-y-2.5">
              {CONNECT.map((item) => (
                <li key={item.label}><LinkItem item={item} /></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {year} IntelliXar. Built on good vibes.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span
              className="w-1.5 h-1.5 rounded-full bg-cyan-500 inline-block"
            />
            <span>AI Startup Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
