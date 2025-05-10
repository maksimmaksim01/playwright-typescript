import { SalesPortalPage } from "../salesPortal.page";

export class CustomerDetails extends SalesPortalPage {
  customerDetailsTitle = this.page.locator(
    "//h3[contains(.,'Customer Details')]"
  );
  emailValue = this.page.locator("#customer-email");
  nameValue = this.page.locator("#customer-name");
  phoneValue = this.page.locator("#customer-phone");
  notesValue = this.page.locator("#customer-notes");
  countryValue = this.page.locator("#customer-country");
  cityValue = this.page.locator("#customer-city");
  streetValue = this.page.locator("#customer-street");
  houseValue = this.page.locator("#customer-house");
  flatValue = this.page.locator("#customer-flat");

  uniqueElement = this.customerDetailsTitle;
}