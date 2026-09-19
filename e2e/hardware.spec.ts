import { test, expect } from "@playwright/test";

test.describe("Hardware page", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/hardware/");
    await expect(page).toHaveTitle(/Hardware/);
    // The h1 is the call to action from devices.json, so match loosely rather
    // than pinning the wording.
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("should render device cards", async ({ page }) => {
    await page.goto("/hardware/");
    const devices = page.getByRole("region", { name: "Partner Devices" });
    await expect(devices).toBeVisible();
    await expect(devices.getByRole("link").first()).toBeVisible();
  });

  test("should expose a description and a social preview image", async ({
    page,
  }) => {
    await page.goto("/hardware/");

    const description = page.locator('meta[name="description"]');
    await expect(description).toHaveAttribute("content", /.{50,}/);

    // og:image must be absolute; a relative value is dropped by most unfurlers.
    const image = page.locator('meta[property="og:image"]');
    await expect(image).toHaveAttribute(
      "content",
      /^https?:\/\/.*\/img\/hardware\/social-preview-1200x630\.png$/,
    );
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      /.+/,
    );
  });

  test("should be reachable from the homepage devices modal", async ({
    page,
  }) => {
    await page.goto("/#hardware");
    await page.getByRole("link", { name: /full hardware page/i }).click();
    await expect(page).toHaveURL(/\/hardware\/?$/);
  });
});
