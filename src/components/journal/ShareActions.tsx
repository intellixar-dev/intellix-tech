import { useState } from 'react';

export default function ShareActions({ url, title }: { url: string; title: string }) {
  const [message, setMessage] = useState('');
  const [showLink, setShowLink] = useState(false);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setMessage('Link copied.');
      setShowLink(false);
    } catch {
      setMessage('Select and copy the link below.');
      setShowLink(true);
    }
  }
  return <div className="journal-share">
    <span className="journal-eyebrow">Share this story</span>
    <div className="journal-tags">
      <a className="journal-pill" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X (opens new tab)">X ↗</a>
      <a className="journal-pill" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn (opens new tab)">LinkedIn ↗</a>
      <button className="journal-pill" onClick={copyLink}>Copy link</button>
    </div>
    <span className="journal-meta" role="status">{message}</span>
    {showLink && <input aria-label="Article link" className="ix-input" readOnly value={url} onFocus={(event) => event.currentTarget.select()} />}
  </div>;
}
