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

  test("should vary the device order between visits", async ({ page }) => {
    // The list shuffles on every visit. The order settles after hydration, which
    // is what would regress if the shuffle were ever moved back into render to
    // satisfy the server.
    const seen = new Set<string>();
    for (let i = 0; i < 5; i++) {
      await page.goto("/hardware/");
      const names = await page
        .getByRole("region", { name: "Partner Devices" })
        .getByRole("heading", { level: 2 })
        .allInnerTexts();
      expect(names.length).toBeGreaterThan(1);
      seen.add(names.join("|"));
    }
    expect(
      seen.size,
      "device order should not be identical on every visit",
    ).toBeGreaterThan(1);
  });

  test("should be reachable from the homepage devices modal", async ({
    page,
  }) => {
    await page.goto("/#hardware");
    await page.getByRole("link", { name: /full hardware page/i }).click();
    await expect(page).toHaveURL(/\/hardware\/?$/);
  });
});
