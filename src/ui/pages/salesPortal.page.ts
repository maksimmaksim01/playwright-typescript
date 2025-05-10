import { expect, Locator, Page } from "@playwright/test";

export abstract class SalesPortalPage {
  spinner: Locator;
  notification: Locator;
  abstract uniqueElement: Locator;

  constructor(protected page: Page) {
    this.spinner = page.locator(".spinner-border");
    this.notification = page.locator(".toast-body");
  }

  async waitForOpenedWithSpinner() {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinner();
  }

  async waitForOpenedWithoutSpinner() {
    await expect(this.uniqueElement).toBeVisible();
  }

  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0);
  }

  async waitForNotification(text: string) {
    await expect(this.notification.last()).toHaveText(text);
  }
}
