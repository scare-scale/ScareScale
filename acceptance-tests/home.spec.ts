import { test, expect } from '@playwright/test';

test.describe('desktop', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test.beforeEach(async ({ isMobile }) => {
    if (isMobile) {
      test.skip();
    }
  });

  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle("Scare Scale");

    await page.screenshot({ path: 'public/screenshots/home_page_screenshot.png' });
  });

  test('nav', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toMatchAriaSnapshot();
  });
});

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ isMobile }) => {
    if (!isMobile) {
      test.skip();
    }
  });

  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle("Scare Scale");
  });

  test('nav closed', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toMatchAriaSnapshot();
  });

  test('nav open', async ({ page }) => {
    await page.goto('/');
    await page.locator('#menuButton').click()
    await expect(page.locator('header')).toMatchAriaSnapshot();
  });
});