import { expect, test } from '@playwright/test';
import { POManger } from '../pages/POManager';

test.only('Add Product To Cart', async ({ page }) => {
  const POM = new POManger(page);

  await POM.getLoginPageInstance().goto();
  await POM.getLoginPageInstance().login('aadilpatni4u@gmail.com', 'Pass@1234');

  const productNames = await POM.getDashboardPageInstance().getProductNames();
  console.log(productNames);

  await POM.getDashboardPageInstance().addProductToCart('Banarsi Saree');
  await POM.getHeaderPageInstance().navigateToCart();

  await POM.getCartPageInstance().waitForCartNavigation();
  await expect(
    POM.getCartPageInstance().getCartProductLocator('Banarsi Saree')
  ).toBeVisible();

  await POM.getCartPageInstance().navigateToCheckout();

  await expect(POM.CheckoutPage.emailLabel).toHaveText(
    'aadilpatni4u@gmail.com'
  );
  await expect(POM.CheckoutPage.emailInput).toHaveValue(
    'aadilpatni4u@gmail.com'
  );

  await POM.CheckoutPage.selectCountryName('India');
  await POM.CheckoutPage.submitOrder();

  await expect(POM.OrderDetailsPage.orderCompleteHeader).toHaveText(
    'Thankyou for the order.'
  );

  let rawOrderId = await POM.OrderDetailsPage.orderId.textContent();
  let orderId = rawOrderId?.split(' ')[2]!;
  console.log(orderId);

  await POM.HeaderPage.navigateToMyOrders();

  await POM.getOrdersPageInstance().navigateToOrderSummary(orderId);

  await expect(POM.getOrderSummaryPageInstance().orderId).toHaveText(orderId);
  await expect(POM.getOrderSummaryPageInstance().productTitle).toHaveText(
    'Banarsi Saree'
  );
});
