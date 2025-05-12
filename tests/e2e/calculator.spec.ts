import { test, expect } from '@playwright/test';

test.describe('Calculator - End to End', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should handle clear and delete properly', async ({ page }) => {
    await page.getByText('9').click();
    await page.getByText('8').click();
    await page.getByText('7').click();
    await expect(page.locator('.display-value')).toHaveText('987');

    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await expect(page.locator('.display-value')).toHaveText('98');

    await page.getByRole('button', { name: /^c$/i }).click();
    await expect(page.locator('.display-value')).toHaveText('');

    await page.getByText('7').click();
    await page.getByText('6').click();
    await page.getByText('9').click();
    await page.getByText('/').click();
    await page.getByText('3').click();
    await page.getByText('2').click();
    await page.getByText('=').click();
    await expect(page.locator('.display-value')).toHaveText('769/32 = 24.03125');

    await page.getByRole('button', { name: /^c$/i }).click();
    await expect(page.locator('.display-value')).toHaveText('');
  });

  test('should handle division by zero', async ({ page }) => {
    await page.getByText('5').click();
    await page.getByText('/').click();
    await page.getByText('0').click();
    await page.getByText('=').click();

    await expect(page.locator('.display-value')).toContainText('Division par zéro');
  });
});
