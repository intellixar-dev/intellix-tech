# Publishing in Intellixar Blogs

The Blogs uses the existing Next.js Pages Router. Articles are local JSON files with Markdown bodies, discovered automatically at build time. No database, account, CMS, or new routing system is involved.

## Publish an article

1. Copy a file from `articles/` to a new `.json` file. Each article needs a unique, stable `id` and lowercase, hyphenated `slug`.
2. Edit the title, excerpt, category, tags, and Markdown `content`. JSON strings use `\n` for line breaks. Any editor with JSON support can validate the file. For long-form writing, draft in a separate Markdown file and use the command below to import it.
3. Put a cover in `public/assets/images/journal/`, then set `coverImage` to `/assets/images/journal/your-image.png` and write descriptive `coverAlt`. Use PNG/JPEG/WebP for compatibility with social previews. A 1200 × 750 image works well. Set `coverImage: null` to use the visual fallback.
4. Set `authorId: "cindy-kandie"`. Authors live separately in `authors.ts`; add future authors there without changing page components.
5. Set `status: "published"` and an ISO UTC `publishedAt` timestamp, such as `2026-09-30T08:00:00Z`. Keep work private with `status: "draft"`. Set `sample: false` (or remove it) for your own writing.
6. Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`, then deploy using the site's existing process.

Only published articles whose publication time has arrived are generated. Draft content is never passed to public pages, search, related articles, or browser bundles. Direct draft URLs return 404. These are static pages: edits, publication, unpublication, and future-dated posts require a new build/deployment. Changing a local status does not revoke an already deployed page until redeployment.

### Import a Markdown draft

After creating metadata by copying an article, run:

```sh
node scripts/journal-import.mjs src/content/journal/articles/your-slug.json /path/to/draft.md
```

This replaces only `content` with the Markdown file's text, preserving metadata. The Markdown draft does not need to live in the repository. A single JSON file remains the source of truth.

### Metadata

The full contract is in `src/lib/journal/types.ts`. `readingTime: null` calculates minutes at 220 words per minute; a positive integer overrides it. `updatedAt: null` hides the update date. `seoTitle` and `seoDescription` default to the article title and excerpt when null. `featured: true` makes an article eligible for the feature slot; when multiple articles qualify, the newest wins. The listing avoids repeating it in the grid. Every filter searches the complete published collection, including the featured article.

Author avatars are optional; initials are shown when none is supplied. Add only verified biography and social-link details. All three included published articles are explicitly labeled samples, with one additional private draft demonstrating the workflow. Replace or remove samples before launch.

### Formatting

Markdown supports headings, paragraphs, links, emphasis, quotes, lists, fenced code blocks, inline code, images, and horizontal rules. Use a quoted image title for a caption:

```md
![Describe the image](/assets/images/journal/example.png "An optional caption")
```

Start sections at `##`; the page supplies the article's main heading. Raw HTML is disabled. React Markdown handles URL safety and escaping; this is content, not executable MDX. Code blocks are horizontally scrollable and keyboard focusable.

## Configuration and SEO

Hero copy, page size, fallback social image, and site origin live in `config.ts`. Set `NEXT_PUBLIC_SITE_URL` to the actual production origin before building on a custom domain. The default is `https://intellixar.vercel.app`. Canonicals, share links, Open Graph, Twitter metadata, and Blog/BlogPosting structured data use this origin. Social platforms may cache preview images after an update.

## Checks

- `npm run typecheck`: TypeScript checks the new content layer and Blogs components while retaining existing JavaScript pages.
- `npm run lint`: ESLint uses the installed Next.js configuration (the old `next lint` command was removed in Next 16).
- `npm test`: content visibility, validation, search, related articles, and content edge cases.
- `npm run build`: production generation and type checking.
- `npx playwright install chromium`, then `npm run test:e2e`: browser checks against the production build at desktop, tablet, and mobile widths. Playwright starts the production server if needed. Screenshots are saved in ignored `test-results/`.

## Extension boundaries

`src/lib/journal/content.ts` is the server-side repository: replace its file adapter when persistent storage becomes necessary. `ArticleSource` stores a stable `authorId`; the repository resolves an `Author` for the public model. `ArticleSummary` excludes body content from discovery page payloads. Components consume these public shapes and never read storage directly.

A future authenticated editor can save drafts against this model, but authorization, uploads, moderation, and publishing permissions must be implemented at that future server boundary. A local status filter is not a substitute for those controls. Slugs are public permalinks; preserve them or add redirects when renaming.

Blogs is a sibling route, leaving existing product, portfolio, and Labs routes intact and `/apps` available for a later platform. No placeholder accounts, dashboards, app routes, comments, or community features are introduced.
