import { Locator, Page } from '@playwright/test';

export class OrderSummaryPage {
  page: Page;
  orderId: Locator;
  productTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderId = page.locator('.col-text');
    this.productTitle = page.locator('.title');
  }
}
