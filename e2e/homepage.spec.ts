import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Meshtastic/);
  });

  test("should display hero section", async ({ page }) => {
    await page.goto("/");
    const heroHeading = page.getByRole("heading", { name: /off-grid/i });
    await expect(heroHeading).toBeVisible();
  });

  test("should have working navigation links", async ({ page }) => {
    await page.goto("/");
    const docsLink = page.getByRole("link", { name: /docs/i }).first();
    await expect(docsLink).toBeVisible();
    await docsLink.click();
    await expect(page).toHaveURL(/\/docs\//);
  });

  test("should send message and receive response in device mockup", async ({
    page,
  }) => {
    // Device mockup is only visible on md and above screens
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const messageInput = page.getByPlaceholder("Type message...");
    await expect(messageInput).toBeVisible();

    const testMessage = "Hello from Playwright test!";
    await messageInput.fill(testMessage);
    const sendButton = page.getByRole("button", { name: "send" });
    await sendButton.click();

    const sentMessage = page.locator(".message-bubble").filter({
      hasText: testMessage,
    });
    await expect(sentMessage).toBeVisible();

    const initialMessageCount = await page.locator(".message-bubble").count();
    await expect(async () => {
      const currentCount = await page.locator(".message-bubble").count();
      expect(currentCount).toBeGreaterThan(initialMessageCount);
    }).toPass({ timeout: 8000 });
  });

  test("should type message using on-screen keyboard and send", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const messageInput = page.getByPlaceholder("Type message...");
    await expect(messageInput).toBeVisible();

    await page.locator("button.font-mono", { hasText: "hh" }).click();
    await page.locator("button.font-mono", { hasText: "ii" }).click();

    await expect(messageInput).toHaveValue("hi");
    await page.locator("button.font-mono", { hasText: "↵↵" }).click();

    // Verify the message appears in the chat
    const sentMessage = page
      .locator(".message-bubble")
      .filter({
        hasText: "You",
      })
      .filter({
        hasText: "hi",
      });
    await expect(sentMessage).toBeVisible();
  });

  test("should open devices modal from Need Hardware button and update URL", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /need hardware/i }).click();

    const dialog = page.getByRole("dialog", { name: "Devices" });
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/#hardware$/);
  });

  test("should open devices modal directly via #hardware deep link", async ({
    page,
  }) => {
    await page.goto("/#hardware");
    const dialog = page.getByRole("dialog", { name: "Devices" });
    await expect(dialog).toBeVisible();
  });

  test("should close devices modal and remove hash when dismissed", async ({
    page,
  }) => {
    await page.goto("/#hardware");
    const dialog = page.getByRole("dialog", { name: "Devices" });
    await expect(dialog).toBeVisible();

    await page.getByRole("button", { name: "Close" }).click();
    await expect(dialog).not.toBeVisible();
    await expect(page).not.toHaveURL(/#hardware/);
  });

  test("should close devices modal with browser back button", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /need hardware/i }).click();

    const dialog = page.getByRole("dialog", { name: "Devices" });
    await expect(dialog).toBeVisible();

    await page.goBack();
    await expect(dialog).not.toBeVisible();
    await expect(page).not.toHaveURL(/#hardware/);
  });

  test("should add emoji reaction to a message", async ({ page }) => {
    // Device mockup is only visible on md and above screens
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const firstMessage = page.locator(".message-bubble").first();
    await expect(firstMessage).toBeVisible();

    const reactButton = firstMessage.getByRole("button", { name: "React" });
    await reactButton.click();

    const thumbsUpEmoji = page.getByRole("button", { name: "👍" });
    await expect(thumbsUpEmoji).toBeVisible();
    await thumbsUpEmoji.click();

    // Verify the reaction appears on the message
    const reaction = firstMessage.getByRole("button", { name: "👍" });
    await expect(reaction).toBeVisible();
  });
});
