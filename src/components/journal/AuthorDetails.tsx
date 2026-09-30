import { useState } from 'react';
import type { Author } from '@/lib/journal/types';

export default function AuthorDetails({ author, expanded = false }: { author: Author; expanded?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`journal-author ${expanded ? 'journal-author-expanded' : ''}`}>
      <div className="journal-avatar" aria-hidden="true">
        {author.avatar && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={author.avatar} alt="" width={44} height={44} onError={() => setFailed(true)} />
        ) : author.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
      </div>
      <div>
        <p className="journal-author-name">{author.name}</p>
        {expanded && <>
          <p className="journal-meta">{author.role}</p>
          <p className="journal-author-bio">{author.bio}</p>
          {author.socialLinks.length > 0 && <div className="journal-tags">{author.socialLinks.map((link) => <a key={link.url} href={link.url} rel="noopener noreferrer" target="_blank">{link.label} ↗</a>)}</div>}
        </>}
      </div>
    </div>
  );
}
