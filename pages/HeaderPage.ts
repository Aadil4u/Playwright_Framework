import { Locator, Page } from '@playwright/test';

export class HeaderPage {
  page: Page;
  cartBtn: Locator;
  myOrdersBtn: Locator;
  yourOdersHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBtn = page.getByRole('button', { name: 'Cart' }).first();
    this.myOrdersBtn = page.locator(
      "button[routerlink*='/dashboard/myorders']"
    );
    this.yourOdersHeader = page.locator('h1:text-is("Your Orders")');
  }

  async navigateToCart() {
    await this.cartBtn.click();
  }

  async navigateToMyOrders() {
    await this.myOrdersBtn.click();
    await this.yourOdersHeader.waitFor();
  }
}
