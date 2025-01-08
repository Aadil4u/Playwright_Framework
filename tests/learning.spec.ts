import { expect, test } from '@playwright/test';

test('Handling Hidden Elements', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await expect(page.locator('#displayed-text')).toBeVisible();
  await page.locator('#hide-textbox').click();
  await expect(page.locator('#displayed-text')).toBeHidden();
  await page.locator('#show-textbox').click();
  await expect(page.locator('#displayed-text')).toBeVisible();
});

test('Handling Alert', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', (dialog) => {
    console.log(dialog.message());
    dialog.accept();
  });
  await page.getByText('Click for JS Alert').click();
  await expect(page.locator('#result')).toHaveText(
    'You successfully clicked an alert'
  );
});

test('Handling Confirm', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', (dialog) => {
    console.log(dialog.message());
    dialog.dismiss();
  });
  await page.getByText('Click for JS Confirm').click();
  await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
});

test('Handling Prompt', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  page.on('dialog', (dialog) => {
    console.log(dialog.message());
    dialog.accept('This is test');
  });
  await page.getByText('Click for JS Prompt').click();
  await expect(page.locator('#result')).toHaveText('You entered: This is test');
});

test('Hover Over Element', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  await page.locator('#mousehover').hover();
  await page.getByRole('link', { name: 'Top' }).click();
  await expect(page.url()).toContain('#top');
});

test.only('Handling Frames', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
  const framePage = page.frameLocator('#courses-iframe');
  await framePage.getByRole('link', { name: 'All Access plan' }).click();
  await framePage.getByText('All Access Subscription').waitFor();
  const noOfSubscribers = await framePage.locator('h2 span').textContent();
  console.log(noOfSubscribers?.replace(',', ''));
});
