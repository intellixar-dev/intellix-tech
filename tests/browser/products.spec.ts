import { test, expect } from '@playwright/test';

const clientNames = ['Kilimo Power'];

test('products expose real ownership, preserve links, and show category metadata', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/projects');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Products built with intention.');
  await expect(page.locator('article[data-product-type="intellixar"]')).toHaveCount(1);
  await expect(page.locator('article[data-product-type="client"]')).toHaveCount(1);
  const radar = page.locator('article[data-product-id="ai-radar"]');
  await expect(radar).toContainText('Intellixar Product');
  await expect(radar).toContainText('Flagship');
  await expect(radar.getByRole('link', { name: 'View Product' })).toHaveAttribute('href', '/ai-radar');
  await expect(page.locator('article[data-product-id="kilimo-power"] a')).toHaveAttribute('href', 'https://kilimopower.co.ke');
  await expect(page.getByText(/MemeGod Creator|2Ride|Overall Interiors|Project Catalyst/)).toHaveCount(0);
  await page.getByRole('link', { name: 'Explore Client Products' }).click();
  await expect(page).toHaveURL(/\/projects\/clients$/);
  await expect(page).toHaveTitle('Client Products | Intellixar');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Built for our clients.');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /partnership/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://intellixar.vercel.app/projects/clients');
  await expect(page.locator('article')).toHaveCount(1);
  for (const name of clientNames) await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'AI Radar', exact: true })).toHaveCount(0);
  await page.getByRole('navigation', { name: 'Product categories' }).getByRole('link', { name: 'Intellixar Products', exact: true }).click();
  await expect(page).toHaveTitle('Intellixar Products | Intellixar');
  await expect(page.locator('article')).toHaveCount(1);
  await page.getByRole('link', { name: 'View Product', exact: true }).click();
  await expect(page).toHaveURL(/\/ai-radar$/);
  await expect(page.getByText('Intellixar Product · Powered by IntelliXar')).toBeVisible();
  expect(errors).toEqual([]);
});

test('header category navigation works with keyboard, touch, and route changes', async ({ page }) => {
  await page.goto('/projects');
  const mobileToggle = page.getByRole('button', { name: 'Toggle menu' });
  const header = page.locator('header').first();
  if (await mobileToggle.isVisible()) {
    await mobileToggle.click();
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'true');
    await header.getByRole('link', { name: 'Client Products', exact: true }).click();
    await expect(mobileToggle).toHaveAttribute('aria-expanded', 'false');
  } else {
    const toggle = page.getByRole('button', { name: 'Product categories', exact: true });
    await toggle.focus();
    await page.keyboard.press('Enter');
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(header.getByRole('link', { name: /Intellixar Products/ })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await page.mouse.click(24, 400); // Outside the dropdown and its trigger.
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await header.getByRole('link', { name: /Client Products/ }).click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  }
  await expect(page).toHaveURL(/\/projects\/clients$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
});

test('product layouts fit both themes and preview images load', async ({ page }, testInfo) => {
  for (const theme of ['light', 'dark']) {
    await page.goto('/projects');
    await page.evaluate((value) => localStorage.setItem('theme', value), theme);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await page.screenshot({ path: `test-results/products-${testInfo.project.name}-${theme}.png`, fullPage: true });
  }
  await page.goto('/');
  const products = page.locator('#products');
  await expect(products.getByRole('heading', { name: 'Built for our clients.', exact: true })).toHaveCount(1);
  await expect(page.getByText(/MemeGod Creator|2Ride|Overall Interiors|Project Catalyst/)).toHaveCount(0);
  await expect(page.locator('#portfolio-teaser article[data-product-id="kilimo-power"]')).toHaveCount(1);
  await expect(products.getByRole('heading', { name: 'AI Radar', exact: true })).toHaveCount(1);
  await expect(products.getByText(/MemeGod Creator|2Ride|Overall Interiors/)).toHaveCount(0);
  await expect(products.locator('article[data-product-type="client"]')).toHaveCount(1);
  await products.scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  for (const reveal of await products.locator('.reveal').all()) {
    await reveal.scrollIntoViewIfNeeded();
    await expect(reveal).toHaveCSS('opacity', '1');
  }
  await products.screenshot({ path: `test-results/home-products-${testInfo.project.name}.png`, style: 'header.sticky { visibility: hidden; }' });
});
