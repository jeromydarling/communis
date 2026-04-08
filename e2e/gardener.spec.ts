import { test, expect } from '@playwright/test'

test.describe('Gardener Console', () => {
  test('renders dark theme overview', async ({ page }) => {
    await page.goto('/gardener')
    await expect(page.getByText('Garden Overview')).toBeVisible()
    await expect(page.getByText('Active co-ops')).toBeVisible()
    await expect(page.getByText('$4,200')).toBeVisible()
    await expect(page.getByText('99.8%')).toBeVisible()
  })

  test('shows tenant list', async ({ page }) => {
    await page.goto('/gardener')
    await expect(page.getByText('Evergreen Workers Co-op')).toBeVisible()
    await expect(page.getByText('Sunrise Cleaning')).toBeVisible()
    await expect(page.getByText('Portland, OR')).toBeVisible()
  })

  test('shows system signals', async ({ page }) => {
    await page.goto('/gardener')
    await expect(page.getByText('System Signals')).toBeVisible()
    await expect(page.getByText(/hasn't logged in/)).toBeVisible()
  })

  test('navigates to Cooperatives page', async ({ page }) => {
    await page.goto('/gardener')
    await page.getByRole('link', { name: 'Cooperatives' }).click()
    await expect(page).toHaveURL(/\/gardener\/tenants/)
    await expect(page.getByText('Cooperatives')).toBeVisible()
  })

  test('Content Studio shows essay pipeline', async ({ page }) => {
    await page.goto('/gardener/content')
    await expect(page.getByText('Content Studio')).toBeVisible()
    await expect(page.getByText('Why Worker Cooperatives Survive')).toBeVisible()
    await expect(page.getByText('Silver Tsunami')).toBeVisible()
    await expect(page.getByText('Drafts')).toBeVisible()
    await expect(page.getByText('Published')).toBeVisible()
  })

  test('SEO Engine shows keyword rankings', async ({ page }) => {
    await page.goto('/gardener/seo')
    await expect(page.getByText('SEO Engine')).toBeVisible()
    await expect(page.getByText('Keyword Rankings')).toBeVisible()
    await expect(page.getByText('worker cooperative software')).toBeVisible()
    await expect(page.getByText('1099-PATR generation')).toBeVisible()
  })

  test('SEO Engine shows Perplexity queries', async ({ page }) => {
    await page.goto('/gardener/seo')
    await expect(page.getByText('Perplexity News Queries')).toBeVisible()
    await expect(page.getByText('worker cooperative news United States')).toBeVisible()
  })

  test('System Health shows service statuses', async ({ page }) => {
    await page.goto('/gardener/system')
    await expect(page.getByText('System Health')).toBeVisible()
    await expect(page.getByText('Supabase')).toBeVisible()
    await expect(page.getByText('Stripe Connect')).toBeVisible()
    await expect(page.getByText('Perplexity AI')).toBeVisible()
    await expect(page.getByText('DeepL Translation')).toBeVisible()
  })

  test('sidebar nav shows System Pulse', async ({ page }) => {
    await page.goto('/gardener')
    await expect(page.getByText('System Pulse')).toBeVisible()
    await expect(page.getByText(/12 active co-ops/)).toBeVisible()
  })

  test('back to site link works', async ({ page }) => {
    await page.goto('/gardener')
    await page.getByText('Back to site').click()
    await expect(page).toHaveURL(/\/$/)
  })
})
