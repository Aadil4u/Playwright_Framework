import { Page, Locator } from "@playwright/test";

export class ProductsPage {
  page: Page;
  products: Locator;
  productCard: Locator;
  cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body b");
    this.productCard = page.locator(".card-body");
    this.cartBtn = page.locator("button[routerlink='/dashboard/cart']");
  }
}
