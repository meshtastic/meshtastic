import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should display main navigation", async ({ page }) => {
    await page.goto("/");
    const navbar = page.locator(".navbar");
    await expect(navbar).toBeVisible();
  });

  test("should have docs, blog, downloads, and flasher links in header", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const navbar = page.locator(".navbar");

    await expect(navbar.getByRole("link", { name: /docs/i })).toBeVisible();
    await expect(navbar.getByRole("link", { name: /blog/i })).toBeVisible();
    await expect(
      navbar.getByRole("link", { name: /downloads/i }),
    ).toBeVisible();
    await expect(navbar.getByRole("link", { name: /flasher/i })).toBeVisible();
  });

  test("should have logo link to homepage", async ({ page }) => {
    await page.goto("/docs/about/");
    const logo = page.locator(".navbar__brand");
    await expect(logo).toBeVisible();
    await logo.click();
    await expect(page).toHaveURL("/");
  });

  test("should have external links with correct attributes", async ({
    page,
  }) => {
    await page.goto("/");
    const githubLink = page.locator('a[href*="github.com/meshtastic"]').first();
    if (await githubLink.isVisible()) {
      await expect(githubLink).toHaveAttribute("target", "_blank");
    }
  });

  test("should have Vercel link in footer", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    const vercelLink = footer.locator('a[href*="vercel"]');
    await expect(vercelLink).toBeVisible();
    await expect(vercelLink).toHaveAttribute("href", /vercel/);
  });
});
