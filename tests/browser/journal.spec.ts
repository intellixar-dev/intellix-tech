import { test, expect } from '@playwright/test';

const engineeringSlug = '/journal/content-is-a-product-boundary';

test('discovery, filters, and empty results work at every viewport', async ({ page }) => {
  await page.goto('/journal');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ideas worth building.');
  await expect(page.locator('.journal-card-featured')).toBeVisible();
  await page.getByRole('button', { name: 'Engineering', exact: true }).click();
  await expect(page.locator('.journal-grid .journal-card')).toHaveCount(1);
  await expect(page).toHaveURL(/category=Engineering/);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await page.getByRole('searchbox').fill('no matching story here');
  await expect(page.getByText('No stories match these filters.', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Show all stories' }).click();
  await page.getByLabel('Tag', { exact: true }).selectOption('Architecture');
  await expect(page.locator('.journal-grid .journal-card')).toHaveCount(1);
  await page.reload();
  await expect(page.getByLabel('Tag', { exact: true })).toHaveValue('Architecture');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
});

test('reading, SEO, sharing, and navigation work', async ({ page, context }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto(engineeringSlug);
  await expect(page).toHaveTitle(/A content model is a product decision.*Intellixar Blogs/);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('meta[name="author"]')).toHaveAttribute('content', 'Cindy Kandie');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://intellixar.vercel.app${engineeringSlug}`);
  await expect(page.locator('.journal-prose pre')).toHaveCount(2);
  await expect(page.locator('.journal-prose figcaption')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Share on X', exact: false })).toHaveAttribute('href', /twitter.com\/intent\/tweet/);
  await expect(page.getByRole('link', { name: 'Share on LinkedIn', exact: false })).toHaveAttribute('href', /linkedin.com\/sharing/);
  await page.getByRole('button', { name: 'Copy link' }).click();
  await expect(page.getByRole('status')).toHaveText('Link copied.');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(`https://intellixar.vercel.app${engineeringSlug}`);
  await expect(page.locator('.journal-related .journal-card')).toHaveCount(1);
  await page.locator('.journal-pagination a').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Small experiments, better questions');
  await page.getByRole('link', { name: 'Back to Blogs', exact: false }).first().click();
  await expect(page).toHaveURL(/\/journal$/);
  expect(errors).toEqual([]);
});

test('draft and invalid slugs are unavailable and absent from public page data', async ({ page, request }) => {
  for (const slug of ['draft-notebook', 'not-a-real-article']) {
    const response = await request.get(`/journal/${slug}`);
    expect(response.status()).toBe(404);
  }
  await page.goto('/journal');
  const data = await page.locator('#__NEXT_DATA__').textContent();
  expect(data).not.toContain('draft-notebook');
  expect(data).not.toContain('This draft must never appear');
  const props = JSON.parse(data!).props.pageProps;
  expect(props.articles.every((article: Record<string, unknown>) => !('content' in article))).toBeTruthy();
});

test('missing images fall back and long text wraps without page overflow', async ({ page }) => {
  await page.route('**/assets/images/journal/*.png', (route) => route.abort());
  await page.goto(engineeringSlug);
  await expect(page.locator('.journal-article-cover .journal-cover-fallback')).toBeVisible();
  // Stress the actual reading layout without publishing fixture articles.
  await page.evaluate(() => {
    document.querySelector('h1')!.textContent = 'A much longer article title about building thoughtful software and learning from experiments '.repeat(5);
    const prose = document.querySelector('.journal-prose')!;
    const content = prose.innerHTML;
    for (let index = 0; index < 8; index++) prose.insertAdjacentHTML('beforeend', content);
    const tags = document.querySelector('.journal-reading-aside .journal-tags')!;
    const tag = tags.firstElementChild!;
    for (let index = 0; index < 25; index++) tags.appendChild(tag.cloneNode(true));
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.getByRole('link', { name: 'Back to Blogs', exact: false }).last().scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Back to Blogs', exact: false }).last()).toBeVisible();
});

test('navigation includes Blogs and both themes stay readable', async ({ page }, testInfo) => {
  await page.goto('/');
  if (await page.getByRole('button', { name: 'Toggle menu' }).isVisible()) await page.getByRole('button', { name: 'Toggle menu' }).click();
  await page.locator('header').getByRole('link', { name: 'Blogs', exact: true }).filter({ visible: true }).click();
  await expect(page).toHaveURL(/\/journal$/);
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
  });
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  for (const image of await page.locator('.journal-card img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: `test-results/journal-${testInfo.project.name}-dark.png`, fullPage: true });
  await page.evaluate(() => { localStorage.setItem('theme', 'light'); });
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  for (const image of await page.locator('.journal-card img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: `test-results/journal-${testInfo.project.name}-light.png`, fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
});

test('clipboard failure offers a selectable link', async ({ page }) => {
  await page.goto(engineeringSlug);
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { value: { writeText: () => Promise.reject(new Error('Denied')) }, configurable: true }));
  await page.getByRole('button', { name: 'Copy link' }).click();
  await expect(page.getByRole('textbox', { name: 'Article link' })).toHaveValue(`https://intellixar.vercel.app${engineeringSlug}`);
});

test('larger collections load more and reset when filtered', async ({ page }) => {
  // Exercise future collection sizes through the same public summary contract.
  await page.route('**/_next/data/**/journal.json*', async (route) => {
    if (route.request().method() !== 'GET') return route.continue();
    const response = await route.fetch();
    const data = await response.json();
    const seed = data.pageProps.articles[0];
    data.pageProps.articles = Array.from({ length: 14 }, (_, index) => ({ ...seed, id: `fixture-${index}`, slug: `fixture-${index}`, featured: false, title: `Experiment ${index}`, category: index < 3 ? 'Engineering' : 'Studio notes' }));
    await route.fulfill({ response, json: data });
  });
  await page.goto(engineeringSlug);
  await page.getByRole('link', { name: 'Back to Blogs', exact: false }).first().click();
  await expect(page.locator('.journal-grid .journal-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'Load more stories' }).click();
  await expect(page.locator('.journal-grid .journal-card')).toHaveCount(12);
  await page.getByRole('button', { name: 'Load more stories' }).click();
  await expect(page.locator('.journal-grid .journal-card')).toHaveCount(14);
  await expect(page.getByRole('button', { name: 'Load more stories' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Engineering', exact: true }).click();
  await expect(page.locator('.journal-grid .journal-card')).toHaveCount(3);
});

test('an article without a cover or related stories renders cleanly', async ({ page }) => {
  await page.route('**/_next/data/**/journal/content-is-a-product-boundary.json*', async (route) => {
    if (route.request().method() !== 'GET') return route.continue();
    const response = await route.fetch();
    const data = await response.json();
    data.pageProps.related = [];
    data.pageProps.previous = null;
    data.pageProps.next = null;
    data.pageProps.article.coverImage = null;
    await route.fulfill({ response, json: data });
  });
  await page.goto('/journal');
  await page.locator('.journal-card').filter({ hasText: 'A content model is a product decision' }).getByRole('link').click();
  await expect(page.locator('.journal-article-cover .journal-cover-fallback')).toBeVisible();
  await expect(page.locator('.journal-related')).toHaveCount(0);
  await expect(page.locator('.journal-pagination')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Back to Blogs', exact: false }).last()).toBeVisible();
});
