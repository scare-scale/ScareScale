import { test, expect ***REMOVED*** from '@playwright/test';

test.describe('desktop', () => {
  test.use({ viewport: { width: 1920, height: 1080 ***REMOVED*** ***REMOVED***);

  test.beforeEach(async ({ isMobile ***REMOVED***) => {
    if (isMobile) {
      test.skip();
    ***REMOVED***
  ***REMOVED***);

  test('has title', async ({ page ***REMOVED***) => {
    await page.goto('/');
    await expect(page).toHaveTitle("Scare Scale");
  ***REMOVED***);

  test('nav', async ({ page ***REMOVED***) => {
    await page.goto('/');
    await expect(page.locator('header')).toMatchAriaSnapshot();
  ***REMOVED***);
***REMOVED***);

test.describe('mobile', () => {
  test.use({ viewport: { width: 375, height: 812 ***REMOVED*** ***REMOVED***);

  test.beforeEach(async ({ isMobile ***REMOVED***) => {
    if (!isMobile) {
      test.skip();
    ***REMOVED***
  ***REMOVED***);

  test('has title', async ({ page ***REMOVED***) => {
    await page.goto('/');
    await expect(page).toHaveTitle("Scare Scale");
  ***REMOVED***);

  test('nav closed', async ({ page ***REMOVED***) => {
    await page.goto('/');
    await expect(page.locator('header')).toMatchAriaSnapshot();
  ***REMOVED***);

  test('nav open', async ({ page ***REMOVED***) => {
    await page.goto('/');
    await page.locator('#menuButton').click()
    await expect(page.locator('header')).toMatchAriaSnapshot();
  ***REMOVED***);
***REMOVED***);