import { test, expect } from '@playwright/test';

test.describe('Calculator - Division', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('division de deux entiers positifs (8 / 2 = 4)', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('8/2');
    await expect(page.locator('.display-result')).toHaveText('4');
  });

  test('division de zéro par un nombre (0 / 5 = 0)', async ({ page }) => {
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('0/5');
    await expect(page.locator('.display-result')).toHaveText('0');
  });

  test('division d’un nombre par zéro (7 / 0 = ∞)', async ({ page }) => {
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('7/0');
    await expect(page.locator('.display-result')).toHaveText('∞');
  });

  test('division avec décimales (5.5 / 2.2 = 2.5)', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '.' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('5.5/2.2');
    await expect(page.locator('.display-result')).toHaveText('2.5');
  });

  test('division négatif / positif (-9 / 3 = -3)', async ({ page }) => {
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('-9/3');
    await expect(page.locator('.display-result')).toHaveText('-3');
  });

  test('division positif / négatif (10 / -2 = -5)', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('10/-2');
    await expect(page.locator('.display-result')).toHaveText('-5');
  });

  test('enchaînement après calcul (= puis / 2)', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-result')).toHaveText('4');

    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-expression')).toHaveText('4/2');
    await expect(page.locator('.display-result')).toHaveText('2');
  });

  test('retour à l’expression précédente après suppression (Suppr.)', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '/' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.locator('.display-result')).toHaveText('2');

    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await expect(page.locator('div').filter({ hasText: /^8\/4$/ }).first()).toBeVisible();
  });
});
