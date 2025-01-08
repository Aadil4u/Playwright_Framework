import { test, expect } from '@playwright/test';

test('Screenshots', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page
    .locator('#displayed-text')
    .screenshot({ path: 'demo/elementScreenshot.png' });
  await page.locator('#hide-textbox').click();
  await page.screenshot({ path: 'demo/pageScreenshot.png' });
  await expect(page.locator('#displayed-text')).toBeHidden();
  await page.locator('#show-textbox').click();
  await expect(page.locator('#displayed-text')).toBeVisible();
});

test.only('Matching Screenshot', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  expect(await page.screenshot()).toMatchSnapshot('landing.jpg');
});
