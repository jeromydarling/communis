import { test, expect } from '@playwright/test'

test.describe('Payment Setup Flow', () => {
  test('shows feature selection with toggle cards', async ({ page }) => {
    await page.goto('/app/payments/setup')
    await expect(page.getByText('Payment Setup')).toBeVisible()
    await expect(page.getByText('Buy-In Collection')).toBeVisible()
    await expect(page.getByText('Recurring Dues')).toBeVisible()
    await expect(page.getByText('Patronage Payouts')).toBeVisible()
  })

  test('can toggle features on and off', async ({ page }) => {
    await page.goto('/app/payments/setup')
    // Recurring Dues starts off — click to enable
    await page.getByText('Recurring Dues').click()
    // Now click Connect Stripe
    await page.getByRole('button', { name: /connect stripe/i }).click()
    await expect(page.getByText('Connect your Stripe account')).toBeVisible()
  })

  test('full payment setup flow', async ({ page }) => {
    await page.goto('/app/payments/setup')

    // Step 1: Select features
    await page.getByText('Recurring Dues').click()
    await page.getByText('Patronage Payouts').click()
    await page.getByRole('button', { name: /connect stripe/i }).click()

    // Step 2: Connect (simulated)
    await expect(page.getByText('Connect your Stripe account')).toBeVisible()
    await page.getByRole('button', { name: /connect with stripe/i }).click()

    // Step 3: Configure
    await expect(page.getByText('Stripe connected successfully')).toBeVisible()
    await expect(page.getByText('Buy-In Collection')).toBeVisible()
    await expect(page.getByText('Recurring Dues')).toBeVisible()
    await expect(page.getByText('Patronage Payouts')).toBeVisible()
    await page.getByRole('button', { name: /activate payments/i }).click()

    // Step 4: Complete
    await expect(page.getByText('Payments are live')).toBeVisible()
  })

  test('cannot proceed without selecting at least one feature', async ({ page }) => {
    await page.goto('/app/payments/setup')
    // Deselect buy-in (which starts selected)
    await page.getByText('Buy-In Collection').click()
    // Button should be disabled
    const connectButton = page.getByRole('button', { name: /connect stripe/i })
    await expect(connectButton).toBeDisabled()
  })
})
