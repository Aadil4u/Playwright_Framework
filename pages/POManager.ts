import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";

export class POManger {
  page: Page;
  LoginPage: LoginPage;
  DashboardPage: DashboardPage;

  constructor(page: Page) {
    this.page = page;
    this.LoginPage = new LoginPage(page);
    this.DashboardPage = new DashboardPage(page);
  }

  getLoginPageInstance() {
    return this.LoginPage;
  }

  getDashboardPageInstance() {
    return this.DashboardPage;
  }
}
