import { expect, test } from "@playwright/test";

// Docusaurus renders inactive <TabItem> panels with the `hidden` attribute, so a
// table-of-contents link pointing into a closed tab has nothing to scroll to.
// src/clientModules/tabAnchors.js opens the owning tab first. Without it, only
// the tab that happens to be selected has working table-of-contents entries.

const TBEAM = "/docs/hardware/devices/lilygo/tbeam/";
const POCKET = "/docs/hardware/devices/rak-wireless/wismesh/pocket/";

test.describe("Table of contents links into tabs", () => {
  // The T-Beam page defaults to the Supreme tab, so S3 Core and 1W start hidden.
  // Headings are matched by id rather than by role: Docusaurus appends a
  // "Direct link to ..." anchor inside each heading, so its accessible name is
  // never just the device name.
  const devices = [
    { name: "T-Beam S3 Core", id: "t-beam-s3-core", tab: "S3-Core" },
    { name: "T-Beam Supreme", id: "t-beam-supreme", tab: "Supreme" },
    { name: "T-Beam 1W", id: "t-beam-1w", tab: "T-Beam 1W" },
  ];

  for (const device of devices) {
    test(`"${device.name}" opens its tab and scrolls to it`, async ({
      page,
    }) => {
      await page.goto(TBEAM);

      await page
        .locator(".table-of-contents")
        .getByRole("link", { name: device.name, exact: true })
        .click();

      const heading = page.locator(`#${device.id}`);
      await expect(heading).toBeVisible();
      await expect(heading).toBeInViewport();
      await expect(
        page.getByRole("tab", { name: device.tab, exact: true }),
      ).toHaveAttribute("aria-selected", "true");
    });
  }

  test("a nested entry opens the tab that owns it", async ({ page }) => {
    await page.goto(TBEAM);

    // #features-2 is the "Features" heading inside the T-Beam 1W tab. The three
    // tabs repeat the heading, so the slugger suffixes them by document order.
    await page.locator('.table-of-contents a[href="#features-2"]').click();

    await expect(page.locator("#features-2")).toBeVisible();
    await expect(page.getByRole("tab", { name: "T-Beam 1W" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("a deep link with a hash opens the tab on load", async ({ page }) => {
    await page.goto(`${TBEAM}#t-beam-s3-core`);

    await expect(page.locator("#t-beam-s3-core")).toBeVisible();
    await expect(page.getByRole("tab", { name: "S3-Core" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("opening a tab records it in the URL so the view is shareable", async ({
    page,
  }) => {
    await page.goto(TBEAM);

    await page.locator('.table-of-contents a[href="#t-beam-1w"]').click();

    await expect(page).toHaveURL(/[?&]t-beam=t-beam-1w/);
  });

  test("every WisMesh Pocket variant is listed in the table of contents", async ({
    page,
  }) => {
    await page.goto(POCKET);
    const toc = page.locator(".table-of-contents");

    for (const variant of [
      "WisMesh Pocket V2",
      "WisMesh Pocket Mini",
      "RAK19026 WisMesh Base Board",
    ]) {
      await expect(
        toc.getByRole("link", { name: variant, exact: true }),
      ).toBeVisible();
    }
  });
});
