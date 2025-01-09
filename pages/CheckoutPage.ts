import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  page: Page;
  emailLabel: Locator;
  emailInput: Locator;
  countryInput: Locator;
  getDropDownOption(countryName: string): Locator {
    return this.page.locator(`span:text-is("${countryName}")`);
  }
  submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLabel = page.locator("label[type*='text']");
    this.emailInput = page.locator("input[type='text']").nth(4);
    this.countryInput = page.getByPlaceholder('Select Country');
    this.submitBtn = page.locator('.action__submit');
  }

  async selectCountryName(countryName: string) {
    await this.countryInput.pressSequentially(countryName, { delay: 100 });
    await this.getDropDownOption(countryName).click();
  }

  async submitOrder() {
    await this.submitBtn.click();
  }
}
