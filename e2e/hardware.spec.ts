import { test, expect } from "@playwright/test";
import devicesData from "../src/data/devices.json";

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
      /^https:\/\/.*\/img\/preview\/hardware-1200x630\.png$/,
    );
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      /.+/,
    );
  });

  const VISITS = 5;
  // A shuffle can legitimately repeat itself, so requiring the order to vary is
  // only a sound assertion while that coincidence stays vanishingly unlikely.
  // Across VISITS draws of n devices the odds of every draw matching are
  // (1/n!)^(VISITS-1): about 1e-15 at seven devices, but 6% at two. devices.json
  // is meant to change, so the assertion is skipped below the threshold rather
  // than left to flake.
  const SHUFFLE_IS_OBSERVABLE = 4;

  test("should list every device, in a varying order", async ({ page }) => {
    const expected = devicesData.devices.map((d) => d.name).sort();
    const orders = new Set<string>();

    for (let i = 0; i < VISITS; i++) {
      await page.goto("/hardware/");
      const names = await page
        .getByRole("region", { name: "Partner Devices" })
        .getByRole("heading", { level: 2 })
        .allInnerTexts();

      expect(names.slice().sort(), "every device should be listed").toEqual(
        expected,
      );
      orders.add(names.join("|"));
    }

    if (devicesData.devices.length >= SHUFFLE_IS_OBSERVABLE) {
      expect(
        orders.size,
        "device order should not be identical on every visit",
      ).toBeGreaterThan(1);
    }
  });

  test("should be reachable from the homepage devices modal", async ({
    page,
  }) => {
    await page.goto("/#hardware");
    await page.getByRole("link", { name: /full hardware page/i }).click();
    await expect(page).toHaveURL(/\/hardware\/?$/);
  });
});
