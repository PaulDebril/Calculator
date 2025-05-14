import { test, expect } from "@playwright/test";

test.describe("History - End to End", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("devrait ", async ({ page }) => {
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("3");
    await page.getByRole("button", { name: "C" });
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "2" }).click();

    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("302");
    await page.getByRole("button", { name: "C" });
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("100");
    await page.getByText("+202302").click();
    await expect(page.locator(".display-result")).toHaveText("302");
  });

  test("devrait vider l'historique", async ({ page }) => {
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("3");
    await page.getByRole("button", { name: "C" });
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await expect(page.getByText("+23")).toBeVisible();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "Vider l'historique" }).click();
    await expect(page.getByText("+23")).not.toBeVisible();
  });
});
