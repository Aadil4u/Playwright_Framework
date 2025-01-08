import { test, expect, BrowserContext } from '@playwright/test';
let orderId: string;
let token: string;
let newContext: BrowserContext;

test.beforeAll(async ({ browser, request }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill('aadilpatni4u@gmail.com');
  await page.locator('#userPassword').fill('Pass@1234');
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body').first().waitFor();
  await context.storageState({ path: 'state.json' });

  token = await page.evaluate(() => {
    return window.localStorage.getItem('token') ?? '';
  });
  await context.close();

  newContext = await browser.newContext({ storageState: 'state.json' });

  // Create Order
  const orderResponse = await request.post(
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

test('Without Request Fixture Skipping Login', async ({ browser }) => {
  const page = await newContext.newPage();

  await page.goto('https://rahulshettyacademy.com/client');
  let productCard = page.locator('.card-body');
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

test('Without Request Fixture Skipping Login1', async ({ browser }) => {
  const page = await newContext.newPage();

  await page.goto('https://rahulshettyacademy.com/client');
  let productCard = page.locator('.card-body');
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
