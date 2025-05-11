import { expect } from "@playwright/test";
import { SalesPortalPage } from "ui/pages/salesPortal.page";

export abstract class Modal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator(`div[role="dialog"]`);

  readonly closeButton = this.uniqueElement.locator(
    'button[aria-label="Close"]'
  );

  async waitForClosed() {
    await expect(this.uniqueElement).not.toBeVisible();
  }

  async closeModal() {
    await this.closeButton.click();
    await expect(this.uniqueElement).not.toBeVisible();
  }
}
