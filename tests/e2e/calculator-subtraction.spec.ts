import { test, expect } from '@playwright/test';

test.describe('Calculator - Soustraction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('soustraction de deux entiers positifs (5 - 3 = 2)', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('5-3');
    await expect(page.locator('.display-result')).toHaveText('2');
  });

  test('résultat négatif (3 - 5 = -2)', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('3-5');
    await expect(page.locator('.display-result')).toHaveText('-2');
  });

  test('soustraction avec décimales (5.5 - 2.2 = 3.3)', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('5.5-2.2');
    await expect(page.locator('.display-result')).toHaveText('3.3');
  });

  test('soustraction de zéro (7 - 0 = 7)', async ({ page }) => {
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('7-0');
    await expect(page.locator('.display-result')).toHaveText('7');
  });

  test('chaînage après calcul (= puis - 1)', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-result')).toHaveText('3');
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('3-1');
    await expect(page.locator('.display-result')).toHaveText('2');
  });

  test('revenir à l’expression précédente après suppression (Suppr.)', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-result')).toHaveText('5');
    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await expect(page.locator('div').filter({ hasText: /^9-4$/ }).first()).toBeVisible();
  });
});
