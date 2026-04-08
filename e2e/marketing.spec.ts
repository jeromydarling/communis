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
      const stats = page.getByText('1,300+')
      await stats.scrollIntoViewIfNeeded()
      await expect(stats).toBeVisible()
      await expect(page.getByText('62.5%')).toBeVisible()
    })

    test('shows live app screenshots in browser frames', async ({ page }) => {
      await page.goto('/')
      const heading = page.getByText('See it in action')
      await heading.scrollIntoViewIfNeeded()
      await expect(heading).toBeVisible()
      await expect(page.getByText('communis.coop/app', { exact: true })).toBeVisible()
    })

    test('shows feature cards', async ({ page }) => {
      await page.goto('/')
      const card = page.getByText('Internal Capital Accounts').first()
      await card.scrollIntoViewIfNeeded()
      await expect(card).toBeVisible()
    })

    test('shows CROS body section', async ({ page }) => {
      await page.goto('/')
      const cros = page.getByText('Built on the CROS body')
      await cros.scrollIntoViewIfNeeded()
      await expect(cros).toBeVisible()
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

      await page.getByRole('navigation').getByRole('link', { name: 'Features' }).click()
      await expect(page).toHaveURL(/\/features/)
      await expect(page.locator('h1')).toContainText('Everything cooperatives need')

      await page.getByRole('navigation').getByRole('link', { name: 'Pricing' }).click()
      await expect(page).toHaveURL(/\/pricing/)
      await expect(page.locator('h1')).toContainText('Every cooperative gets everything')

      await page.getByRole('navigation').getByRole('link', { name: 'Map' }).click()
      await expect(page).toHaveURL(/\/map/)

      await page.getByRole('navigation').getByRole('link', { name: 'Manifesto' }).click()
      await expect(page).toHaveURL(/\/manifesto/)

      await page.getByRole('navigation').getByRole('link', { name: 'Open Source' }).click()
      await expect(page).toHaveURL(/\/open-source/)
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
      await expect(page.locator('h2').filter({ hasText: 'Core Modules' })).toBeVisible()
      const governance = page.locator('h2').filter({ hasText: /^Governance$/ })
      await governance.scrollIntoViewIfNeeded()
      await expect(governance).toBeVisible()
      const ops = page.locator('h2').filter({ hasText: /^Operations$/ })
      await ops.scrollIntoViewIfNeeded()
      await expect(ops).toBeVisible()
      const nri = page.locator('h2').filter({ hasText: 'NRI Layer' })
      await nri.scrollIntoViewIfNeeded()
      await expect(nri).toBeVisible()
    })

    test('core modules have detail lists', async ({ page }) => {
      await page.goto('/features')
      await expect(page.getByText('Individual member equity tracking')).toBeVisible()
    })
  })

  test.describe('Pricing Page', () => {
    test('shows two-tier pricing model', async ({ page }) => {
      await page.goto('/pricing')
      await expect(page.locator('h3').filter({ hasText: /^Communis$/ })).toBeVisible()
      await expect(page.getByText('Communis + Payments')).toBeVisible()
      await expect(page.getByText('$49').first()).toBeVisible()
      await expect(page.getByText('0.5%').first()).toBeVisible()
    })

    test('shows free tier callout', async ({ page }) => {
      await page.goto('/pricing')
      await expect(page.getByText(/free for co-ops with 5 or fewer/i)).toBeVisible()
    })

    test('shows Stripe Connect explanation', async ({ page }) => {
      await page.goto('/pricing')
      const heading = page.getByText('How payments work')
      await heading.scrollIntoViewIfNeeded()
      await expect(heading).toBeVisible()
    })
  })

  test.describe('Cooperative Map', () => {
    test('renders map with cooperatives', async ({ page }) => {
      await page.goto('/map')
      await expect(page.locator('h2')).toContainText('Cooperatives Across America')
      await expect(page.locator('svg').first()).toBeVisible()
    })

    test('industry filter works', async ({ page }) => {
      await page.goto('/map')
      const select = page.locator('select')
      await select.selectOption('Cleaning Services')
      await expect(page.locator('h2')).toContainText('Cooperatives Across America')
    })

    test('shows state stats', async ({ page }) => {
      await page.goto('/map')
      const stats = page.getByText('Top states')
      await stats.scrollIntoViewIfNeeded()
      await expect(stats).toBeVisible()
    })
  })

  test.describe('Manifesto Page', () => {
    test('covers cooperative history broadly', async ({ page }) => {
      await page.goto('/manifesto')
      await expect(page.getByText('Rochdale Pioneers')).toBeVisible()
      const hamer = page.getByText('Fannie Lou Hamer')
      await hamer.scrollIntoViewIfNeeded()
      await expect(hamer).toBeVisible()
    })
  })

  test.describe('Open Source Page', () => {
    test('lists tech stack', async ({ page }) => {
      await page.goto('/open-source')
      const heading = page.locator('h2').filter({ hasText: 'The Stack' })
      await heading.scrollIntoViewIfNeeded()
      await expect(heading).toBeVisible()
      await expect(page.locator('h3').filter({ hasText: /^React$/ })).toBeVisible()
    })

    test('has feedback links', async ({ page }) => {
      await page.goto('/open-source')
      const bug = page.getByText('Report a Bug')
      await bug.scrollIntoViewIfNeeded()
      await expect(bug).toBeVisible()
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
