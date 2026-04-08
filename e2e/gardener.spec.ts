import { test, expect } from '@playwright/test'

test.describe('Gardener Console', () => {
  test('renders dark theme overview', async ({ page }) => {
    await page.goto('/gardener')
    await expect(page.locator('h1')).toContainText('Garden Overview')
    await expect(page.getByText('Active co-ops', { exact: true })).toBeVisible()
    await expect(page.getByText('$4,200')).toBeVisible()
  })

  test('shows tenant list', async ({ page }) => {
    await page.goto('/gardener')
    const tenants = page.getByText('Cooperatives').nth(0)
    await tenants.scrollIntoViewIfNeeded()
    await expect(page.getByText('Evergreen Workers Co-op')).toBeVisible()
    await expect(page.getByText('Sunrise Cleaning')).toBeVisible()
  })

  test('shows system signals', async ({ page }) => {
    await page.goto('/gardener')
    const signals = page.getByText('System Signals')
    await signals.scrollIntoViewIfNeeded()
    await expect(signals).toBeVisible()
  })

  test('navigates to Cooperatives page', async ({ page }) => {
    await page.goto('/gardener')
    await page.locator('aside').getByRole('link', { name: 'Cooperatives' }).click()
    await expect(page).toHaveURL(/\/gardener\/tenants/)
  })

  test('Content Studio shows essay pipeline', async ({ page }) => {
    await page.goto('/gardener/content')
    await expect(page.locator('h1')).toContainText('Content Studio')
    await expect(page.getByText('Why Worker Cooperatives Survive')).toBeVisible()
  })

  test('SEO Engine shows keyword rankings', async ({ page }) => {
    await page.goto('/gardener/seo')
    await expect(page.locator('h1')).toContainText('SEO Engine')
    await expect(page.getByText('worker cooperative software')).toBeVisible()
  })

  test('SEO Engine shows Perplexity queries', async ({ page }) => {
    await page.goto('/gardener/seo')
    const heading = page.getByText('Perplexity News Queries')
    await heading.scrollIntoViewIfNeeded()
    await expect(heading).toBeVisible()
  })

  test('System Health shows service statuses', async ({ page }) => {
    await page.goto('/gardener/system')
    await expect(page.locator('h1')).toContainText('System Health')
    await expect(page.getByText('Supabase').first()).toBeVisible()
    await expect(page.getByText('Stripe Connect').first()).toBeVisible()
  })

  test('sidebar nav shows System Pulse', async ({ page }) => {
    await page.goto('/gardener')
    await expect(page.locator('aside').getByText('System Pulse')).toBeVisible()
  })

  test('back to site link works', async ({ page }) => {
    await page.goto('/gardener')
    await page.locator('aside').getByText('Back to site').click()
    await expect(page).toHaveURL(/\/$/)
  })
})
