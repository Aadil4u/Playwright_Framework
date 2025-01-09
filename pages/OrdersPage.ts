import { Locator, Page } from '@playwright/test';

export class OrdersPage {
  page: Page;
  orderViewBtn(orderId: string): Locator {
    return this.page
      .locator('tbody tr')
      .filter({ hasText: orderId })
      .locator('.btn.btn-primary');
  }

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToOrderSummary(orderId: string) {
    await this.orderViewBtn(orderId).click();
  }
}
