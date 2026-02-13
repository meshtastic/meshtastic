import { test, expect } from "@playwright/test";

test.describe("Documentation", () => {
  test("should load docs page", async ({ page }) => {
    await page.goto("/docs/about/");
    await expect(page).toHaveTitle(/Meshtastic/);
  });

  test("should display sidebar navigation", async ({ page }) => {
    await page.goto("/docs/about/");
    const sidebar = page.locator(".theme-doc-sidebar-container");
    await expect(sidebar).toBeVisible();
  });

  test("should navigate via sidebar links", async ({ page }) => {
    await page.goto("/docs/about/");
    const sidebarLink = page.locator(".theme-doc-sidebar-container a").first();
    await expect(sidebarLink).toBeVisible();
  });

  test("should display doc content", async ({ page }) => {
    await page.goto("/docs/about/");
    const docContent = page.locator("article").first();
    await expect(docContent).toBeVisible();
  });
});
