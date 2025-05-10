import { SalesPortalPage } from "./salesPortal.page";
import { IUser } from "types/user.types";

export class SignInPage extends SalesPortalPage {
  loginButton = this.page.getByRole("button", { name: "Login" });
  emailInput = this.page.locator("#emailinput");
  passwordInput = this.page.locator("#passwordinput");

  uniqueElement = this.loginButton;

  async fillCredentials(userData: IUser) {
    await this.emailInput.fill(userData.username);
    await this.passwordInput.fill(userData.password);
  }

  async clickOnLoginButton() {
    await this.loginButton.click();
  }
}
