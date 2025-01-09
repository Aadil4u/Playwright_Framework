import { Locator, Page } from '@playwright/test';

export class DashboardPage {
  page: Page;
  productsCard: Locator;
  productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsCard = page.locator('.card-body');
    this.productNames = this.productsCard.locator('b');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/client');
  }

  async getProductNames() {
    const productNames = await this.productNames.allTextContents();
    return productNames;
  }

  async addProductToCart(actualProductName: string) {
    await this.productsCard.first().waitFor();
    const productsCount = await this.productsCard.count();

    for (let i = 0; i < productsCount; i++) {
      let productName = await this.productNames.nth(i).textContent();
      if (productName === actualProductName) {
        await this.productsCard.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }
}
