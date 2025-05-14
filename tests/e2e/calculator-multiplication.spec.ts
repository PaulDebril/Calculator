import { test, expect } from "@playwright/test";

test.describe("Calculator - Multiplication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("multiplication de deux entiers positifs (6 * 7 = 42)", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "6" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "7" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("6*7");
    await expect(page.locator(".display-result")).toHaveText("42");
  });

  test("multiplication par zéro (9 * 0 = 0)", async ({ page }) => {
    await page.getByRole("button", { name: "9" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("9*0");
    await expect(page.locator(".display-result")).toHaveText("0");
  });

  test("zéro multiplié (0 * 5 = 0)", async ({ page }) => {
    await page.getByRole("button", { name: "0" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("0*5");
    await expect(page.locator(".display-result")).toHaveText("0");
  });

  test("multiplication avec décimales (2.5 * 4.2 = 10.5)", async ({ page }) => {
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "." }).click();
    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "." }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("2.5*4.2");
    await expect(page.locator(".display-result")).toHaveText("10.5");
  });

  test("nombre négatif * positif (-3 * 4 = -12)", async ({ page }) => {
    await page.getByRole("button", { name: "-" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("-3*4");
    await expect(page.locator(".display-result")).toHaveText("-12");
  });

  test("positif * négatif (5 * -2 = -10)", async ({ page }) => {
    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "-" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("5*-2");
    await expect(page.locator(".display-result")).toHaveText("-10");
  });

  test("enchaînement après calcul (= puis * 3)", async ({ page }) => {
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("20");

    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-expression")).toHaveText("20*3");
    await expect(page.locator(".display-result")).toHaveText("60");
  });

  test("retour à l’expression précédente après suppression (Suppr.)", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "8" }).click();
    await page.getByRole("button").filter({ hasText: /^$/ }).nth(1).click();
    await page.getByRole("button", { name: "6" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await expect(page.locator(".display-result")).toHaveText("48");

    await page.getByRole("button").filter({ hasText: /^$/ }).first().click();
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^8\*6$/ })
        .first(),
    ).toBeVisible();
  });
});
