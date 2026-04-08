import { test, expect } from '@playwright/test'

test.describe('Payment Setup Flow', () => {
  test('shows feature selection with toggle cards', async ({ page }) => {
    await page.goto('/app/payments/setup')
    await expect(page.locator('h2')).toContainText('Payment Setup')
    await expect(page.getByRole('button', { name: /buy-in collection/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /recurring dues/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /patronage payouts/i })).toBeVisible()
  })

  test('can toggle features on and off', async ({ page }) => {
    await page.goto('/app/payments/setup')
    await page.getByRole('button', { name: /recurring dues/i }).click()
    await page.getByRole('button', { name: /connect stripe/i }).click()
    await expect(page.getByText('Connect your Stripe account')).toBeVisible()
  })

  test('full payment setup flow', async ({ page }) => {
    await page.goto('/app/payments/setup')

    // Step 1: Select features
    await page.getByRole('button', { name: /recurring dues/i }).click()
    await page.getByRole('button', { name: /patronage payouts/i }).click()
    await page.getByRole('button', { name: /connect stripe/i }).click()

    // Step 2: Connect (simulated)
    await expect(page.getByText('Connect your Stripe account')).toBeVisible()
    await page.getByRole('button', { name: /connect with stripe/i }).click()

    // Step 3: Configure
    await expect(page.getByText('Stripe connected successfully')).toBeVisible()
    await page.getByRole('button', { name: /activate payments/i }).click()

    // Step 4: Complete
    await expect(page.getByText('Payments are live')).toBeVisible()
  })

  test('cannot proceed without selecting at least one feature', async ({ page }) => {
    await page.goto('/app/payments/setup')
    // Deselect buy-in (which starts selected)
    await page.getByRole('button', { name: /buy-in collection/i }).click()
    await expect(page.getByText('Select at least one feature')).toBeVisible()
  })
})
