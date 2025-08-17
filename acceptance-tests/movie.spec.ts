import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/movie/heart-eyes-2025");
  await expect(page).toHaveTitle("Heart Eyes (2025) Review & Scare Scale Rating");
});

test("movie details", async ({ page }) => {
  await page.goto("/movie/heart-eyes-2025");
  await expect(page.locator("#movieDetails")).toMatchAriaSnapshot();
});