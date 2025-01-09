import { Locator, Page } from "@playwright/test";
import { DashboardPage } from "./DashboardPage";

export class LoginPage {
  page: Page;
  emailInput: Locator;
  passInput: Locator;
  loginBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder("email@example.com");
    this.passInput = page.getByPlaceholder("enter your passsword");
    this.loginBtn = page.getByText("Login");
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passInput.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState("networkidle");
    return new DashboardPage(this.page);
  }
}
