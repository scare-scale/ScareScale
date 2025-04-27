import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/movie/heart-eyes");
  await expect(page).toHaveTitle("Scare Scale");
});

test("movie details", async ({ page }) => {
  await page.goto("/movie/heart-eyes");
  await expect(page.locator("section")).toMatchAriaSnapshot();
});