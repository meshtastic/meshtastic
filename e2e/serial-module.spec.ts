import { test, expect } from "@playwright/test";

const SERIAL_URL = "/docs/configuration/module/serial";

test.describe("Serial Module Documentation", () => {
  test("should load the serial module page", async ({ page }) => {
    await page.goto(SERIAL_URL);
    await expect(page).toHaveTitle(/Serial/);
  });

  test("should display the page heading", async ({ page }) => {
    await page.goto(SERIAL_URL);
    const heading = page.getByRole("heading", {
      name: /Serial Module Configuration/i,
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("should display the config values section", async ({ page }) => {
    await page.goto(SERIAL_URL);
    const configSection = page.getByRole("heading", {
      name: /Serial Module Config Values/i,
    });
    await expect(configSection).toBeVisible();
  });

  test("should display the T1000-E setup section", async ({ page }) => {
    await page.goto(SERIAL_URL);
    const t1000Section = page.getByRole("heading", {
      name: /SenseCAP T1000-E Serial Setup/i,
    });
    await expect(t1000Section).toBeVisible();
  });

  test("should display the mode examples section", async ({ page }) => {
    await page.goto(SERIAL_URL);
    const modeSection = page.getByRole("heading", { name: /Mode Examples/i });
    await expect(modeSection).toBeVisible();
  });

  test("should display the Python scripting examples section", async ({
    page,
  }) => {
    await page.goto(SERIAL_URL);
    const pythonSection = page.getByRole("heading", {
      name: /Python Scripting Examples/i,
    });
    await expect(pythonSection).toBeVisible();
  });

  test("should display client availability tabs", async ({ page }) => {
    await page.goto(SERIAL_URL);
    const androidTab = page.getByRole("tab", { name: /Android/i });
    await expect(androidTab).toBeVisible();
    const cliTab = page.getByRole("tab", { name: /CLI/i });
    await expect(cliTab).toBeVisible();
  });

  test("should switch between client availability tabs", async ({ page }) => {
    await page.goto(SERIAL_URL);
    const cliTab = page.getByRole("tab", { name: /CLI/i });
    await cliTab.click();
    const cliContent = page.getByRole("tabpanel").filter({
      hasText: /serial.enabled/,
    });
    await expect(cliContent).toBeVisible();
  });

  test("should display code blocks for T1000-E configuration", async ({
    page,
  }) => {
    await page.goto(SERIAL_URL);
    const codeBlock = page.locator("code").filter({
      hasText: /serial.txd/,
    });
    await expect(codeBlock.first()).toBeVisible();
  });

  test("should display the wiring table for pogo pin connection", async ({
    page,
  }) => {
    await page.goto(SERIAL_URL);
    const pogoSection = page.getByRole("heading", {
      name: /Pogo Pin Connection/i,
    });
    await expect(pogoSection).toBeVisible();
    const table = pogoSection.locator("~ table").first();
    await expect(table).toBeVisible();
  });

  test("should have sidebar navigation visible", async ({ page }) => {
    await page.goto(SERIAL_URL);
    const sidebar = page.locator(".theme-doc-sidebar-container");
    await expect(sidebar).toBeVisible();
  });

  test("should have breadcrumb navigation", async ({ page }) => {
    await page.goto(SERIAL_URL);
    const breadcrumb = page.locator(".breadcrumbs");
    await expect(breadcrumb).toBeVisible();
  });
});
