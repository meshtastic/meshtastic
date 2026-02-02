import { test, expect } from "@playwright/test";

// Screen size constants
const MOBILE = { width: 375, height: 667 };
const TABLET = { width: 768, height: 1024 };
const DESKTOP = { width: 1280, height: 800 };

test.describe("Responsive Design", () => {
  test("should show mobile menu button on small screens", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/");
    const menuButton = page.locator(".navbar__toggle");
    await expect(menuButton).toBeVisible();
  });

  test("should toggle mobile menu", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/");
    const menuButton = page.locator(".navbar__toggle");
    await menuButton.click();
    const sidebar = page.locator(".navbar-sidebar");
    await expect(sidebar).toBeVisible();
  });

  test("should hide mobile menu on desktop", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/");
    const menuButton = page.locator(".navbar__toggle");
    await expect(menuButton).not.toBeVisible();
  });

  test("should display content properly on tablet", async ({ page }) => {
    await page.setViewportSize(TABLET);
    await page.goto("/");
    const heroHeading = page.getByRole("heading", { name: /off-grid/i });
    await expect(heroHeading).toBeVisible();
  });

  test("should hide device mockup on mobile", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/");
    const deviceMockup = page.getByPlaceholder("Type message...");
    await expect(deviceMockup).not.toBeVisible();
  });

  test("should show device mockup on desktop", async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto("/");
    const deviceMockup = page.getByPlaceholder("Type message...");
    await expect(deviceMockup).toBeVisible();
  });

  test("should hide donate and github buttons on mobile", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/");
    const navbar = page.locator(".navbar");
    const donateLink = navbar.getByRole("link", { name: /donate/i });
    const githubLink = navbar.getByRole("link", { name: /github/i });
    await expect(donateLink).not.toBeVisible();
    await expect(githubLink).not.toBeVisible();
  });

  test("should have all navbar items in mobile sidebar", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/");

    const menuButton = page.locator(".navbar__toggle");
    await menuButton.click();
    const sidebar = page.locator(".navbar-sidebar");
    await expect(sidebar).toBeVisible();

    await expect(sidebar.getByRole("link", { name: /docs/i })).toBeVisible();
    await expect(sidebar.getByRole("link", { name: /blog/i })).toBeVisible();
    await expect(
      sidebar.getByRole("link", { name: /downloads/i }),
    ).toBeVisible();
    await expect(sidebar.getByRole("link", { name: /flasher/i })).toBeVisible();
    await expect(sidebar.getByRole("link", { name: /donate/i })).toBeVisible();
    await expect(sidebar.getByRole("link", { name: /github/i })).toBeVisible();
  });

  test("should show social bar at bottom on mobile", async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto("/");

    // The mobile social bar is fixed at bottom with social links
    const discordLink = page.getByRole("link", { name: "Discord" });
    await expect(discordLink).toBeVisible();
    const youtubeLink = page.getByRole("link", { name: "YouTube" });
    await expect(youtubeLink).toBeVisible();
  });

  test("should show social bar at bottom on tablet", async ({ page }) => {
    await page.setViewportSize(TABLET);
    await page.goto("/");

    const discordLink = page.getByRole("link", { name: "Discord" });
    await expect(discordLink).toBeVisible();
  });
});
