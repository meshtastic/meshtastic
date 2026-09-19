import { test, expect } from "@playwright/test";
import devicesData from "../src/data/devices.json";

// Guards swapping devices in and out of src/data/devices.json. The device art is
// hosted by the web-flasher, which serves its SPA shell for an unknown path, so a
// typo in `image` comes back 200 with an HTML body rather than a 404. Checking the
// status alone would pass while the card renders blank; the content type is what
// actually catches it.

const { devices, imageBaseUrl } = devicesData;

test.describe("devices.json", () => {
  test("lists at least one device", () => {
    expect(devices.length).toBeGreaterThan(0);
  });

  test("every entry is complete", () => {
    for (const device of devices) {
      expect(device.name?.trim(), "name is required").toBeTruthy();
      expect(device.vendor?.trim(), `${device.name}: vendor`).toBeTruthy();
      expect(device.image?.trim(), `${device.name}: image`).toBeTruthy();
      expect(device.url?.trim(), `${device.name}: url`).toBeTruthy();
      expect(
        Array.isArray(device.tags) && device.tags.length > 0,
        `${device.name}: at least one tag`,
      ).toBe(true);
      expect(
        device.url,
        `${device.name}: url is absolute or site-relative`,
      ).toMatch(/^(https?:\/\/|\/)/);
    }
  });

  test("device names are unique", () => {
    // The name is the React key for each card.
    const names = devices.map((d) => d.name);
    expect(new Set(names).size, `duplicate name in ${names.join(", ")}`).toBe(
      names.length,
    );
  });

  for (const device of devices) {
    test(`${device.name} has artwork`, async ({ request }) => {
      const url = `${imageBaseUrl}${device.image}`;
      const response = await request.get(url);
      expect(response.status(), `${url} should resolve`).toBe(200);
      expect(
        response.headers()["content-type"] ?? "",
        `${url} should be an image; an HTML body means the filename is wrong`,
      ).toMatch(/^image\//);
    });
  }
});
