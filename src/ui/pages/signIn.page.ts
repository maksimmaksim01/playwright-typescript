import { SalesPortalPage } from "./salesPortal.page";
import { IUser } from "types/user.types";

export class SignInPage extends SalesPortalPage {
  readonly loginButton = this.page.getByRole("button", { name: "Login" });
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");

  readonly uniqueElement = this.loginButton;

  async fillCredentials(userData: IUser) {
    await this.emailInput.fill(userData.username);
    await this.passwordInput.fill(userData.password);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }
}
