import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow user to sign in', async ({ page }) => {
    await page.getByRole('link', { name: 'Sign In' }).click();
    await expect(page).toHaveURL('/auth/signin');
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('testpassword');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    // Verify successful login
    await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('should show validation errors for invalid credentials', async ({ page }) => {
    await page.goto('/auth/signin');
    
    await page.getByLabel('Email').fill('invalid@email');
    await page.getByRole('button', { name: 'Sign In' }).click();
    
    await expect(page.getByText('Invalid email address')).toBeVisible();
  });

  test('should allow password reset flow', async ({ page }) => {
    await page.goto('/auth/signin');
    await page.getByText('Forgot password?').click();
    
    await expect(page).toHaveURL('/auth/reset-password');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('button', { name: 'Reset Password' }).click();
    
    await expect(page.getByText('Check your email')).toBeVisible();
  });
});