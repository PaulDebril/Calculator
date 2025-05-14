import { test, expect } from "@playwright/test";

test.describe("Calculator - End to End", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("devrait faire (5 + 3) * 2 - 4 / 2 = 14", async ({ page }) => {
    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("8");

    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("16");

    await page.getByRole("button", { name: "-" }).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("12");

    await page.getByRole("button", { name: "/" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("12/2");
    await expect(page.locator(".display-result")).toHaveText("6");
  });

  test("devrait enchaîner 1+2-3*4/2 = -4", async ({ page }) => {
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("3");

    await page.getByRole("button", { name: "-" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("0");

    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("0");

    await page.getByRole("button", { name: "/" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("0/2");
    await expect(page.locator(".display-result")).toHaveText("0");
  });

  test("devrait réinitialiser puis calculer 7*3 = 21", async ({ page }) => {
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("10");
    await page.getByRole("button", { name: "C" }).click();
    await expect(page.locator(".display-input")).toHaveText("0");
    await page.getByRole("button", { name: "7" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("7*3");
    await expect(page.locator(".display-result")).toHaveText("21");
  });
});
