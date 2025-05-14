import { test, expect } from "@playwright/test";

test.describe("Calculator - Addition", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("addition de deux chiffres simples", async ({ page }) => {
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "=" }).click();

    await expect(page.locator(".display-expression")).toHaveText("1+1");
    await expect(page.locator(".display-result")).toHaveText("2");
  });

  test("addition de 3 chiffres simples", async ({ page }) => {
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "=" }).click();

    await expect(page.locator(".display-expression")).toHaveText("1+1+1");
    await expect(page.locator(".display-result")).toHaveText("3");
  });

  test("addition de nombres multi-chiffres", async ({ page }) => {
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "=" }).click();

    await expect(page.locator(".display-expression")).toHaveText("12+34");
    await expect(page.locator(".display-result")).toHaveText("46");
  });

  test("addition avec décimales", async ({ page }) => {
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "." }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "." }).click();
    await page.getByRole("button", { name: "4" }).click();
    await page.getByRole("button", { name: "=" }).click();

    await expect(page.locator(".display-expression")).toHaveText("1.2+3.4");
    await expect(page.locator(".display-result")).toHaveText("4.6");
  });

  test("addition avec nombre négatif à gauche", async ({ page }) => {
    await page.getByRole("button", { name: "-" }).click();
    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "=" }).click();

    await expect(page.locator(".display-expression")).toHaveText("-5+3");
    await expect(page.locator(".display-result")).toHaveText("-2");
  });

  test("addition avec nombre négatif à droite", async ({ page }) => {
    await page.getByRole("button", { name: "5" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "-" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "=" }).click();

    await expect(page.locator(".display-expression")).toHaveText("5+-3");
    await expect(page.locator(".display-result")).toHaveText("2");
  });

  test("chaînage après calcul", async ({ page }) => {
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "2" }).click();
    await page.getByRole("button", { name: "=" }).click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "3" }).click();
    await page.getByRole("button", { name: "=" }).click();

    await expect(page.locator(".display-expression")).toHaveText("4+3");
    await expect(page.locator(".display-result")).toHaveText("7");
  });

  test("grands nombres", async ({ page }) => {
    for (let i = 0; i < 9; i++) {
      await page.getByRole("button", { name: "9" }).click();
    }
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "1" }).click();
    await page.getByRole("button", { name: "=" }).click();

    await expect(page.locator(".display-expression")).toHaveText("999999999+1");
    await expect(page.locator(".display-result")).toHaveText("1000000000");
  });
});
