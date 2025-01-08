import { expect, test } from '@playwright/test';
import exp from 'constants';
import { execPath } from 'process';

test('First Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.Google.com');
});

test.only('Without Context Test', async ({ page, context }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());

  // Verify Blinking Text
  await expect(page.locator('div a').first()).toHaveAttribute(
    'class',
    'blinkingText'
  );

  // Verify New Tab
  const newPagePromise = context.waitForEvent('page');
  await page.locator('div a').first().click();
  const newPage = await newPagePromise;

  await expect(newPage.locator('h1')).toHaveText('Documents request');
  await expect(newPage).toHaveTitle('RS Academy');
  await expect(newPage).toHaveURL(
    'https://rahulshettyacademy.com/documents-request'
  );

  //   first way to verify title
  expect(await page.title()).toEqual(
    'LoginPage Practise | Rahul Shetty Academy'
  );

  //   second way to verify title
  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

  //   verifying invalid error
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('invalid');
  await page.locator("input[value='user']").check();
  await expect(page.locator('.modal-body > p')).toHaveText(
    'You will be limited to only fewer functionalities of the app. Proceed?'
  );
  await page.locator('#okayBtn').click();
  await expect(page.locator("input[value='user']")).toBeChecked();
  await page.locator('select').selectOption('teach');
  await expect(page.locator('select')).toHaveValue('teach');
  await page.locator('#terms').check();
  await expect(page.locator('#terms')).toBeChecked();
  await page.locator('#signInBtn').click();
  console.log(await page.locator("div[style*='display: block']").textContent());
  await expect(page.locator("div[style*='display: block']")).toHaveText(
    'Incorrect username/password.'
  );
  await page.locator('#username').fill('rahulshettyacademy');
  await page.locator('#password').fill('learning');
  await page.locator('#signInBtn').click();
  await page.locator('.card-body a').nth(0).waitFor();

  const productNames = await page.locator('.card-body a').allTextContents();
  console.log(productNames);
});
