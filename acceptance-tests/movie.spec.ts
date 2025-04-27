import { test, expect ***REMOVED*** from "@playwright/test";

test("has title", async ({ page ***REMOVED***) => {
  await page.goto("/movie/heart-eyes");
  await expect(page).toHaveTitle("Scare Scale");
***REMOVED***);

test("movie details", async ({ page ***REMOVED***) => {
  await page.goto("/movie/heart-eyes");
  await expect(page.locator("section")).toMatchAriaSnapshot();
***REMOVED***);