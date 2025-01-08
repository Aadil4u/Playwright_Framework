import { test, request, expect } from '@playwright/test';
import exp from 'constants';
let token: string;
let fakePayload = { data: [], message: 'No Orders' };
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
});

test('Routing Response', async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('.card-body').first().waitFor();

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
    (route) => {
      route.fulfill({ body: JSON.stringify(fakePayload) });
    }
  );

  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await expect(page.locator('.container div').first()).toHaveText(
    'You have No Orders to show at this time. Please Visit Back Us'
  );
});

test('Routing Request', async ({ page }) => {
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);

  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('.card-body').first().waitFor();

  await page.route(
    'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
    (route, request) => {
      route.continue({
        url: request.url().slice(0, -3) + '000',
      });
    }
  );

  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await page.getByRole('button', { name: 'View' }).first().click();
  await expect(page.locator('div p.blink_me')).toHaveText(
    'You are not authorize to view this order'
  );
});

test('Aborting Request', async ({ page }) => {
  page.on('request', (request) => {
    console.log(request.url());
  });

  page.on('response', (response) => {
    console.log(response.url());
    console.log(response.status());
  });
  await page.addInitScript((token) => {
    window.localStorage.setItem('token', token);
  }, token);

  await page.route('**/*.{jpg,css,png,jpeg}', (route) => {
    route.abort();
  });
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('.card-body').first().waitFor();

  await page.locator("button[routerlink*='/dashboard/myorders']").click();
  await page.getByRole('button', { name: 'View' }).first().click();
});
