import Markdown from 'react-markdown';
import CoverImage from './CoverImage';

export default function ArticleContent({ content }: { content: string }) {
  return <div className="journal-prose">
    <Markdown skipHtml components={{
      // Article titles own the h1; a Markdown h1 becomes a section heading.
      h1: ({ children }) => <h2>{children}</h2>,
      a: ({ href, children }) => <a href={href} {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>,
      pre: ({ children }) => <pre tabIndex={0} aria-label="Code example">{children}</pre>,
      // Keep paragraphs semantic while allowing a figure to contain an image caption.
      p: ({ children, node }) => node?.children.some((child) => child.type === 'element' && child.tagName === 'img')
        ? <div className="journal-paragraph">{children}</div>
        : <p className="journal-paragraph">{children}</p>,
      img: ({ src, alt, title }) => <figure><CoverImage src={src || null} alt={alt || ''} />{title && <figcaption>{title}</figcaption>}</figure>,
    }}>{content}</Markdown>
  </div>;
}
