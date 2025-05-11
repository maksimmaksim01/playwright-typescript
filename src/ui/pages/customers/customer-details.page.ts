import { SalesPortalPage } from "../salesPortal.page";

export class CustomerDetails extends SalesPortalPage {
  customerDetailsTitle = this.page.locator(
    "//h3[contains(.,'Customer Details')]"
  );
  readonly emailValue = this.page.locator("#customer-email");
  readonly nameValue = this.page.locator("#customer-name");
  readonly phoneValue = this.page.locator("#customer-phone");
  readonly notesValue = this.page.locator("#customer-notes");
  readonly countryValue = this.page.locator("#customer-country");
  readonly cityValue = this.page.locator("#customer-city");
  readonly streetValue = this.page.locator("#customer-street");
  readonly houseValue = this.page.locator("#customer-house");
  readonly flatValue = this.page.locator("#customer-flat");

  readonly uniqueElement = this.customerDetailsTitle;
}