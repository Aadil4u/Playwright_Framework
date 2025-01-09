import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  productsCard: Locator;
  productNames: Locator;
  cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsCard = page.locator(".card-body");
    this.productNames = this.productsCard.locator("b");
    this.cartBtn = page.getByRole("button", { name: "Cart" }).first();
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async getProductNames() {
    const productNames = await this.productNames.allTextContents();
    return productNames;
  }

  async getProductsCount() {
    return await this.productsCard.count();
  }
}
