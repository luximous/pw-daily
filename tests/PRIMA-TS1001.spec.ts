import { test, expect } from '@playwright/test';

test('TC1001', async ({ page }) => {
  await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
  await page.getByText('First Time Login').click();
  await page.getByLabel('Username').fill('azqacp1');
  await page.getByRole('button', { name: 'Validate' }).click();
});

test('TC1002', async ({ page }) => {
  await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
  await page.getByLabel('Username').fill('azqacp1');
  await page.getByLabel('Password').fill('azqa100');
  await page.getByLabel('Password').press('Enter');
});

test('TC1003', async ({ page }) => {
  await page.goto('http://118.107.203.38:9080/#/auth/kpj/login');
  await page.getByLabel('Username').fill('azqacp1');
  await page.getByLabel('Password').fill('azqa100');
  await page.getByLabel('Password').press('Enter'); 
  await page.getByRole('button', { name: 'azqacp1' }).click();
  await page.getByRole('link', { name: ' Change Password' }).click();
  await page.getByRole('dialog').locator('a').click();
});