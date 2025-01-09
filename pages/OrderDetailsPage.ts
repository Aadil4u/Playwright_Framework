import { Locator, Page } from '@playwright/test';

export class OrderDetailsPage {
  page: Page;
  orderCompleteHeader: Locator;
  orderId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderCompleteHeader = page.locator('.hero-primary');
    this.orderId = page.locator('td label').nth(1);
  }
}
