import { expect, test } from "@playwright/test";
import path from "path";

test("File Download", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/download");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "webdriverIO.png" }).click();
  const download = await downloadPromise;

  await download.saveAs("download/" + download.suggestedFilename());
});

test("Upload File", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");

  await page
    .locator("#file-upload")
    .setInputFiles(path.join(__dirname) + "/../data/Browsers.png");

  await page.getByRole("button", { name: "Upload" }).click();
  await expect(
    page.getByRole("heading", { name: "File Uploaded!" })
  ).toBeVisible();
});

test("Upload File Using File Chooser", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");

  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.locator("#file-upload").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles(path.join(__dirname) + "/../data/Browsers.png");

  await page.getByRole("button", { name: "Upload" }).click();
  await expect(
    page.getByRole("heading", { name: "File Uploaded!" })
  ).toBeVisible();
});
