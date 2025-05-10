import { Locator, expect } from "@playwright/test";

export async function assertTextValue(
  locator: Locator,
  value: string
) {
  await expect(locator).toContainText(value);
}
