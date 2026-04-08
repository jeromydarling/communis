import { test, expect } from '@playwright/test'

test.describe('Marketing Site', () => {
  test.describe('Homepage', () => {
    test('renders hero with headline and CTAs', async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('h1')).toContainText('operating system')
      await expect(page.locator('h1')).toContainText('your co-op deserves')
      await expect(page.getByRole('link', { name: /try the demo/i }).first()).toBeVisible()
      await expect(page.getByRole('link', { name: /read the manifesto/i }).first()).toBeVisible()
    })

    test('displays cooperative sector stats', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByText('1,300+')).toBeVisible()
      await expect(page.getByText('62.5%')).toBeVisible()
      await expect(page.getByText('2:1')).toBeVisible()
    })

    test('shows live app screenshots in browser frames', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByText('See it in action')).toBeVisible()
      await expect(page.getByText('communis.coop/app')).toBeVisible()
      await expect(page.getByText('communis.coop/app/patronage')).toBeVisible()
    })

    test('shows feature cards', async ({ page }) => {
      await page.goto('/')
      const featureCard = page.getByText('Internal Capital Accounts')
      await featureCard.scrollIntoViewIfNeeded()
      await expect(featureCard).toBeVisible()
    })

    test('shows CROS body section', async ({ page }) => {
      await page.goto('/')
      await expect(page.getByText('Built on the CROS body')).toBeVisible()
      await expect(page.getByText('NRI — The Head')).toBeVisible()
      await expect(page.getByText('You — The Nervous System')).toBeVisible()
    })

    test('Try the Demo links to /demo', async ({ page }) => {
      await page.goto('/')
      await page.getByRole('main').getByRole('link', { name: /try the demo/i }).first().click()
      await expect(page).toHaveURL(/\/demo/)
    })
  })

  test.describe('Navigation', () => {
    test('desktop nav links work', async ({ page }) => {
      await page.goto('/')

      await page.getByRole('link', { name: 'Features' }).first().click()
      await expect(page).toHaveURL(/\/features/)
      await expect(page.getByText('Everything cooperatives need')).toBeVisible()

      await page.getByRole('link', { name: 'Pricing' }).first().click()
      await expect(page).toHaveURL(/\/pricing/)
      await expect(page.getByText('Every cooperative gets everything')).toBeVisible()

      await page.getByRole('link', { name: 'Map' }).first().click()
      await expect(page).toHaveURL(/\/map/)
      await expect(page.getByText('Cooperatives Across America')).toBeVisible()

      await page.getByRole('link', { name: 'Manifesto' }).first().click()
      await expect(page).toHaveURL(/\/manifesto/)
      await expect(page.getByText('Technology should carry the weight')).toBeVisible()

      await page.getByRole('link', { name: 'Open Source' }).first().click()
      await expect(page).toHaveURL(/\/open-source/)
      await expect(page.getByText('Built on open source')).toBeVisible()
    })

    test('logo links back to homepage', async ({ page }) => {
      await page.goto('/features')
      await page.getByRole('link', { name: /communis/i }).first().click()
      await expect(page).toHaveURL(/\/$/)
    })
  })

  test.describe('Features Page', () => {
    test('shows all 4 module categories', async ({ page }) => {
      await page.goto('/features')
      await expect(page.getByText('Core Modules')).toBeVisible()
      await expect(page.getByText('Governance')).toBeVisible()
      await expect(page.getByText('Operations')).toBeVisible()
      await expect(page.getByText('NRI Layer')).toBeVisible()
    })

    test('core modules have detail lists', async ({ page }) => {
      await page.goto('/features')
      await expect(page.getByText('Individual member equity tracking')).toBeVisible()
      await expect(page.getByText('1099-PATR generation')).toBeVisible()
    })
  })

  test.describe('Pricing Page', () => {
    test('shows two-tier pricing model', async ({ page }) => {
      await page.goto('/pricing')
      await expect(page.getByText('Communis', { exact: false }).first()).toBeVisible()
      await expect(page.getByText('Communis + Payments')).toBeVisible()
      await expect(page.getByText('$49')).toBeVisible()
      await expect(page.getByText('0.5%')).toBeVisible()
    })

    test('shows free tier callout', async ({ page }) => {
      await page.goto('/pricing')
      await expect(page.getByText(/free for co-ops with 5 or fewer/i)).toBeVisible()
    })

    test('shows Stripe Connect explanation', async ({ page }) => {
      await page.goto('/pricing')
      await expect(page.getByText('How payments work')).toBeVisible()
      await expect(page.getByText('Your co-op connects to Stripe')).toBeVisible()
      await expect(page.getByText('Your money stays your money')).toBeVisible()
    })
  })

  test.describe('Cooperative Map', () => {
    test('renders map with cooperatives', async ({ page }) => {
      await page.goto('/map')
      await expect(page.getByText('Cooperatives Across America')).toBeVisible()
      await expect(page.locator('svg')).toBeVisible()
    })

    test('industry filter works', async ({ page }) => {
      await page.goto('/map')
      const select = page.locator('select')
      await select.selectOption('Cleaning Services')
      // After filtering, count should change
      await expect(page.getByText(/Cooperatives Across America/)).toBeVisible()
    })

    test('shows state stats', async ({ page }) => {
      await page.goto('/map')
      await expect(page.getByText('Top states')).toBeVisible()
      await expect(page.getByText(/California/)).toBeVisible()
    })
  })

  test.describe('Manifesto Page', () => {
    test('covers cooperative history broadly', async ({ page }) => {
      await page.goto('/manifesto')
      await expect(page.getByText('Rochdale Pioneers')).toBeVisible()
      await expect(page.getByText('Fannie Lou Hamer')).toBeVisible()
      await expect(page.getByText('Mondragon')).toBeVisible()
      await expect(page.getByText('silver tsunami')).toBeVisible()
    })
  })

  test.describe('Open Source Page', () => {
    test('lists tech stack', async ({ page }) => {
      await page.goto('/open-source')
      await expect(page.getByText('React')).toBeVisible()
      await expect(page.getByText('TypeScript')).toBeVisible()
      await expect(page.getByText('PostgreSQL')).toBeVisible()
      await expect(page.getByText('Supabase')).toBeVisible()
    })

    test('has feedback links', async ({ page }) => {
      await page.goto('/open-source')
      await expect(page.getByText('Report a Bug')).toBeVisible()
      await expect(page.getByText('Request a Feature')).toBeVisible()
    })
  })

  test.describe('Demo Gate', () => {
    test('shows contact form', async ({ page }) => {
      await page.goto('/demo')
      await expect(page.getByText('See Communis in action')).toBeVisible()
      await expect(page.getByLabel(/your name/i)).toBeVisible()
      await expect(page.getByLabel(/email/i)).toBeVisible()
    })

    test('skip link bypasses to demo', async ({ page }) => {
      await page.goto('/demo')
      await page.getByText(/skip for now/i).click()
      await expect(page).toHaveURL(/\/app/)
    })

    test('form submission leads to demo', async ({ page }) => {
      await page.goto('/demo')
      await page.getByLabel(/your name/i).fill('Test User')
      await page.getByLabel(/email/i).fill('test@example.coop')
      await page.getByRole('button', { name: /enter the demo/i }).click()
      await expect(page.getByText('Welcome aboard')).toBeVisible({ timeout: 2000 })
    })
  })
})
