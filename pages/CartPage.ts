import { Locator, Page } from '@playwright/test';

export class CartPage {
  page: Page;
  cartHeader: Locator;
  productName: Locator;
  getCartProductLocator(productName: string): Locator {
    return this.page.locator(`h3:has-text('${productName}')`);
  }
  checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartHeader = page.locator("h1:has-text('My Cart')");
    this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
  }

  async waitForCartNavigation() {
    await this.cartHeader.waitFor();
  }

  async navigateToCheckout() {
    await this.checkoutBtn.click();
  }
}
