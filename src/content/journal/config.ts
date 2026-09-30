export const journalConfig = {
  name: 'Intellixar Blogs',
  heading: 'Ideas worth building.',
  description: 'Thoughts, experiments, lessons, and stories from the people building at Intellixar.',
  eyebrow: 'Notes from the studio',
  pageSize: 6,
  // Set this to the production origin when using a custom domain.
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || 'https://intellixar.vercel.app').replace(/\/$/, ''),
  defaultImage: '/assets/images/journal/ideas.png',
};

export function absoluteUrl(path: string) {
  return new URL(path, journalConfig.siteUrl).toString();
}
