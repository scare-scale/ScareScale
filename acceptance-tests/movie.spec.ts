import { test, expect ***REMOVED*** from "@playwright/test";

test("has title", async ({ page ***REMOVED***) => {
  await page.goto("/movie/heart-eyes");
  await expect(page).toHaveTitle("Scare Scale - Heart Eyes Review & Scare Ratings");
***REMOVED***);

test("movie details", async ({ page ***REMOVED***) => {
  await page.goto("/movie/heart-eyes");
  await expect(page.locator("#movieDetails")).toMatchAriaSnapshot();
***REMOVED***);