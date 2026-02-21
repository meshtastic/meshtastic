import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test("should open search modal with button click", async ({ page }) => {
    await page.goto("/");
    const searchButton = page.locator(".DocSearch-Button");
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    const searchModal = page.locator(".DocSearch-Modal");
    await expect(searchModal).toBeVisible();
  });

  test("should accept search input", async ({ page }) => {
    await page.goto("/");
    const searchButton = page.locator(".DocSearch-Button");
    await searchButton.click();
    const searchInput = page.locator(".DocSearch-Input");
    await expect(searchInput).toBeVisible();
    await searchInput.fill("meshtastic");
    await expect(searchInput).toHaveValue("meshtastic");
  });
});
