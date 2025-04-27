import { test, expect } from "@playwright/test";

test("search movie", async ({ page }) => {
  await page.goto("/");

  // Enter search query in search bar
  await page.fill("input[id=searchInput]", "heart eyes")

  // Execute search
  await page.press("input[id=searchInput]", "Enter")

  // Validate results are returned
  await expect(page.locator("section")).toMatchAriaSnapshot();

  // Enter second search query in search bar
  await page.fill("input[id=searchInput]", "monkey")

  // Click search button
  await page.locator('#searchButton').click()

  // Validate results are returned
  await expect(page.locator("section")).toMatchAriaSnapshot();
});