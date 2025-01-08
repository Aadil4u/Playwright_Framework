import { Page, Locator } from "@playwright/test";

export class LoginPage {
  page: Page;
  public emailField: Locator;
  public passField: Locator;
  public loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByPlaceholder("email@example.com");
    this.passField = page.getByPlaceholder("enter your passsword");
    this.loginBtn = page.getByRole("button", { name: "Login" });
  }
}
