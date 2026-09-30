# Product catalogue

`products.ts` is the shared catalogue for the homepage Products section, `/projects`, `/projects/intellixar`, and `/projects/clients`.

Add an entry with a stable `id`, `title`, `description`, and explicit `type` (`intellixar` or `client`). Ownership never depends on the product name or whether its link is internal. Set `featured` for the flagship product; AI Radar retains that position and its `/ai-radar` URL.

Optional card fields include `category` (for example, AI Tool), `image`, `status`, `technologies`, `href`, `ctaLabel`, and `caseStudyUrl`. `href` is the existing product page or live URL. Omit it when no destination is available. Local images live under `public/`; their paths start with `/assets/`. `catalogueDescription` preserves longer catalogue copy when the homepage uses a shorter `description`.

Client entries may also include `clientName`, `industry`, `projectType`, `year`, `projectDescription`, and `outcomes`. Leave unavailable metadata absent. Cards show available client details, stack, and links; descriptions and outcomes can support later case studies without requiring new routes now.

The published catalogue currently contains AI Radar under Intellixar Products and Kilimo Power under Client Products. Client metadata comes from the existing homepage and Portfolio content. No new client claims or outcomes have been added. A category without entries renders an empty state automatically.
