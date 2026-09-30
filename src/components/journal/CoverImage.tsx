import { useEffect, useRef, useState } from 'react';

export default function CoverImage({ src, alt, priority = false, className = '' }: { src: string | null; alt: string; priority?: boolean; className?: string }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    // A failed eager image can finish before React attaches its error handler.
    if (src && imageRef.current?.complete && imageRef.current.naturalWidth === 0) setFailedSrc(src);
  }, [src]);
  return (
    <div className={`journal-cover ${className}`}>
      {src && failedSrc !== src ? (
        // Local editorial assets retain their aspect ratio and have a graceful failure state.
        // eslint-disable-next-line @next/next/no-img-element
        <img ref={imageRef} src={src} alt={alt} width={1200} height={750} loading={priority ? 'eager' : 'lazy'} decoding="async" onError={() => setFailedSrc(src)} />
      ) : (
        <div className="journal-cover-fallback" role="img" aria-label={alt || 'Intellixar Blogs cover'}>
          <span aria-hidden="true">ix<span> / </span>journal</span>
        </div>
      )}
    </div>
  );
}
