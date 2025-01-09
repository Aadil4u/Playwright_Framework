import { expect, test } from "@playwright/test";
import { POManger } from "../pages/POManager";

test.only("Add Product To Cart", async ({ page }) => {
  const POM = new POManger(page);

  POM.getLoginPageInstance().goto();
  const dashboardPage = POM.getLoginPageInstance().login(
    "aadilpatni4u@gmail.com",
    "Pass@1234"
  );

  const productNames = (await dashboardPage).getProductNames();
  console.log(productNames);

  const productsCount = (await dashboardPage).getProductsCount;
  console.log(productsCount);

  for (let i = 0; i < productsCount; i++) {
    let productName = await productCard.locator("b").nth(i).textContent();
    if (productName === "Banarsi Saree") {
      await productCard.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.getByRole("button", { name: "Cart" }).first().click();

  await page.locator("h1:has-text('My Cart')").waitFor();
  await expect(page.locator("h3:has-text('Banarsi Saree')")).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();
  await expect(page.locator("label[type*='text']")).toHaveText(
    "aadilpatni4u@gmail.com"
  );
  await expect(page.locator("input[type='text']").nth(4)).toHaveValue(
    "aadilpatni4u@gmail.com"
  );
  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("India", { delay: 100 });
  await page.locator('span:text-is("India")').click();
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    "Thankyou for the order."
  );
  let rawOrderId = await page.locator("td label").nth(1).textContent();
  let orderId = rawOrderId?.split(" ")[2]!;
  console.log(orderId);
  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await page.locator('h1:text-is("Your Orders")').waitFor();
  await page
    .locator("tbody tr")
    .filter({ hasText: orderId })
    .locator(".btn.btn-primary")
    .click();
  await expect(page.locator(".email-title")).toHaveText(" order summary ");
  await expect(page.locator(".col-text")).toHaveText(orderId);
  await expect(page.locator(".title")).toHaveText("Banarsi Saree");
});
