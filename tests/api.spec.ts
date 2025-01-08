import { test, request, expect } from '@playwright/test';
let token: string;
let orderId: string;

test.beforeAll(async () => {
  // Login API
  const apiRequest = await request.newContext();
  const response = await apiRequest.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: { userEmail: 'aadilpatni4u@gmail.com', userPassword: 'Pass@1234' },
    }
  );

  expect(response.ok()).toBeTruthy();
  token = (await response.json()).token;

  // Create Order

  const orderResponse = await apiRequest.post(
    'https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
      data: {
        orders: [
          { country: 'India', productOrderedId: '676a631fe2b5443b1f004a20' },
        ],
      },
      headers: {
        Authorization: token,
      },
    }
  );

  orderId = (await orderResponse.json()).orders[0];
});

test('Without Request Fixture Skipping Login', async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);

  let productCard = page.locator('.card-body');
  await page.goto('https://rahulshettyacademy.com/client');
  await page.waitForLoadState('networkidle');
  const productNames = await productCard.locator('b').allTextContents();
  console.log(productNames);

  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await page.locator('h1:text-is("Your Orders")').waitFor();
  await page
    .locator('tbody tr')
    .filter({ hasText: orderId })
    .locator('.btn.btn-primary')
    .click();
  await expect(page.locator('.email-title')).toHaveText(' order summary ');
  await expect(page.locator('.col-text')).toHaveText(orderId);
  await expect(page.locator('.title')).toHaveText('Banarsi Saree');
});
