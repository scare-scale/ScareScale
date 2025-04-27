import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/movie/heart-eyes");
  await expect(page).toHaveTitle("Scare Scale - Heart Eyes Review & Scare Ratings");
});

test("movie details", async ({ page }) => {
  await page.goto("/movie/heart-eyes");
  await expect(page.locator("#movieDetails")).toMatchAriaSnapshot();
});