import { test, expect } from '@playwright/test'

async function switchRole(page: any, roleName: string) {
  // Open the dropdown
  await page.locator('header').getByText(/viewing as/i).click()
  await page.waitForTimeout(200)
  // The dropdown items have unique "As <PersonName>" text — find the button containing the role name
  // and click it with dispatchEvent to bypass overlay interception
  const roleButton = page.locator('button').filter({ hasText: new RegExp(roleName, 'i') }).filter({ hasText: /^(?!.*Viewing)/ }).first()
  await roleButton.dispatchEvent('click')
  await page.waitForTimeout(300)
}

test.describe('App Demo', () => {
  test.describe('Dashboard', () => {
    test('shows NRI greeting and stats', async ({ page }) => {
      await page.goto('/app')
      await expect(page.getByText('Good morning, Evergreen')).toBeVisible()
      await expect(page.getByText('active members', { exact: true })).toBeVisible()
      await expect(page.getByText('total member equity')).toBeVisible()
      await expect(page.getByText('surplus to distribute')).toBeVisible()
    })

    test('shows NRI signals section', async ({ page }) => {
      await page.goto('/app')
      await expect(page.locator('h2').filter({ hasText: 'NRI Signals' })).toBeVisible()
    })

    test('shows cooperative rhythm section', async ({ page }) => {
      await page.goto('/app')
      const rhythm = page.locator('h2').filter({ hasText: 'Cooperative Rhythm' })
      await rhythm.scrollIntoViewIfNeeded()
      await expect(rhythm).toBeVisible()
    })
  })

  test.describe('Role Switcher', () => {
    test('opens role dropdown and switches to Candidate', async ({ page }) => {
      await page.goto('/app')
      await switchRole(page, 'candidate')
      await expect(page.getByText(/viewing as candidate/i)).toBeVisible()
    })

    test('candidate sees limited nav items', async ({ page }) => {
      await page.goto('/app')
      await switchRole(page, 'candidate')
      await expect(page.locator('aside').getByRole('link', { name: 'Dashboard' })).toBeVisible()
      await expect(page.locator('aside').getByRole('link', { name: 'Payments' })).not.toBeVisible()
      await expect(page.locator('aside').getByRole('link', { name: 'Import' })).not.toBeVisible()
    })

    test('switching to Member shows voting rights', async ({ page }) => {
      await page.goto('/app')
      // Use the unique persona name for Member role
      await page.locator('header').getByText(/viewing as/i).click()
      await page.waitForTimeout(200)
      await page.locator('button').filter({ hasText: 'Full worker-owner with voting rights' }).dispatchEvent('click')
      await page.waitForTimeout(300)
      await expect(page.getByText('Can vote').first()).toBeVisible()
    })

    test('switching to Advisor shows no voting', async ({ page }) => {
      await page.goto('/app')
      await switchRole(page, 'advisor')
      await expect(page.getByText('Cannot vote').first()).toBeVisible()
    })

    test('NRI signal changes per role', async ({ page }) => {
      await page.goto('/app')
      // Steward default — check NRI signal card in sidebar
      await expect(page.locator('aside').getByText('NRI Signal')).toBeVisible()
      // Switch to Candidate
      await switchRole(page, 'candidate')
      await expect(page.locator('aside').getByText(/candidacy|training milestones/i)).toBeVisible()
    })
  })

  test.describe('Members', () => {
    test('shows all members with status badges', async ({ page }) => {
      await page.goto('/app/members')
      await expect(page.getByText('María Reyes').first()).toBeVisible()
      await expect(page.getByText('Roberto Sandoval')).toBeVisible()
      await expect(page.getByText('Active Member').first()).toBeVisible()
    })

    test('clicking member navigates to story', async ({ page }) => {
      await page.goto('/app/members')
      await page.getByText('Ana Lucía Vega').click()
      await expect(page).toHaveURL(/\/app\/members\/3/)
      await expect(page.locator('h2').filter({ hasText: 'Member Story' })).toBeVisible()
    })
  })

  test.describe('Member Story', () => {
    test('shows member narrative and equity', async ({ page }) => {
      await page.goto('/app/members/1')
      await expect(page.locator('h1')).toContainText('María Reyes')
      await expect(page.locator('h2').filter({ hasText: 'Equity Journey' })).toBeVisible()
      await expect(page.getByText('$12,480').first()).toBeVisible()
    })

    test('shows narrative equity summary', async ({ page }) => {
      await page.goto('/app/members/1')
      const narrative = page.getByText(/reflects.*years of shared ownership/)
      await narrative.scrollIntoViewIfNeeded()
      await expect(narrative).toBeVisible()
    })

    test('shows buy-in progress', async ({ page }) => {
      await page.goto('/app/members/3')
      await expect(page.getByText('Buy-in progress')).toBeVisible()
    })

    test('shows labor contribution', async ({ page }) => {
      await page.goto('/app/members/1')
      const labor = page.locator('h2').filter({ hasText: 'Labor Contribution' })
      await labor.scrollIntoViewIfNeeded()
      await expect(labor).toBeVisible()
    })

    test('back link returns to members', async ({ page }) => {
      await page.goto('/app/members/1')
      await page.getByRole('link', { name: /all members/i }).click()
      await expect(page).toHaveURL(/\/app\/members$/)
    })

    test('candidate shows onboarding narrative', async ({ page }) => {
      await page.goto('/app/members/6')
      await expect(page.getByText(/path to full membership/i)).toBeVisible()
    })
  })

  test.describe('Governance', () => {
    test('shows active proposals', async ({ page }) => {
      await page.goto('/app/governance')
      await expect(page.locator('h2').filter({ hasText: 'Active Proposals' })).toBeVisible()
      await expect(page.getByText('Approve Q4 2024 Patronage Distribution')).toBeVisible()
      await expect(page.getByText('Accept Roberto Sandoval')).toBeVisible()
    })

    test('voting proposal shows vote progress', async ({ page }) => {
      await page.goto('/app/governance')
      await expect(page.getByText('3 for').first()).toBeVisible()
      await expect(page.getByText(/\d\s*\/\s*5 voted/).first()).toBeVisible()
    })

    test('has Cast Your Vote button', async ({ page }) => {
      await page.goto('/app/governance')
      await expect(page.getByRole('button', { name: /cast your vote/i })).toBeVisible()
    })

    test('shows resolved proposals', async ({ page }) => {
      await page.goto('/app/governance')
      const resolved = page.locator('h2').filter({ hasText: 'Resolved' })
      await resolved.scrollIntoViewIfNeeded()
      await expect(resolved).toBeVisible()
      await expect(page.getByText('Update Grievance Policy')).toBeVisible()
    })
  })

  test.describe('Patronage', () => {
    test('shows distribution summary', async ({ page }) => {
      await page.goto('/app/patronage')
      await expect(page.locator('h1')).toContainText('Patronage Distribution')
      await expect(page.getByText('80 / 20')).toBeVisible()
      await expect(page.getByText('Subchapter T')).toBeVisible()
    })

    test('shows member allocation table', async ({ page }) => {
      await page.goto('/app/patronage')
      const heading = page.locator('h2').filter({ hasText: 'Member Allocations' })
      await heading.scrollIntoViewIfNeeded()
      await expect(heading).toBeVisible()
    })

    test('shows 1099-PATR callout', async ({ page }) => {
      await page.goto('/app/patronage')
      const callout = page.getByText('1099-PATR Generation')
      await callout.scrollIntoViewIfNeeded()
      await expect(callout).toBeVisible()
    })

    test('shows narrative explanation', async ({ page }) => {
      await page.goto('/app/patronage')
      await expect(page.getByText(/this quarter.*generated/i)).toBeVisible()
    })
  })

  test.describe('Committees', () => {
    test('shows committee list', async ({ page }) => {
      await page.goto('/app/committees')
      await expect(page.getByText('Board of Directors')).toBeVisible()
      await expect(page.getByText('Finance Committee')).toBeVisible()
    })

    test('shows chair badge', async ({ page }) => {
      await page.goto('/app/committees')
      await expect(page.getByText('Chair').first()).toBeVisible()
    })

    test('rotation fairness tab works', async ({ page }) => {
      await page.goto('/app/committees')
      await page.getByRole('button', { name: 'Rotation Fairness' }).click()
      await expect(page.getByText('Rotation Fairness Index')).toBeVisible()
    })

    test('shows NRI understaffing signal', async ({ page }) => {
      await page.goto('/app/committees')
      const signal = page.getByText(/training committee is understaffed/i)
      await signal.scrollIntoViewIfNeeded()
      await expect(signal).toBeVisible()
    })
  })

  test.describe('Payments', () => {
    test('shows payment dashboard', async ({ page }) => {
      await page.goto('/app/payments')
      await expect(page.locator('h1')).toContainText('Payments')
      await expect(page.getByText('Stripe Connected')).toBeVisible()
    })

    test('tabs switch between views', async ({ page }) => {
      await page.goto('/app/payments')
      await page.getByRole('button', { name: 'Buy-Ins' }).click()
      await expect(page.getByText('María Reyes').first()).toBeVisible()

      await page.getByRole('button', { name: 'Dues' }).click()
      await expect(page.getByText('$50/month per active member')).toBeVisible()

      await page.getByRole('button', { name: 'Patronage Payouts' }).click()
      await expect(page.getByText(/awaiting vote/i)).toBeVisible()
    })
  })

  test.describe('Integrations', () => {
    test('financial dashboard shows QBO data', async ({ page }) => {
      await page.goto('/app/integrations')
      await expect(page.getByText('Synced from QuickBooks').first()).toBeVisible()
      await expect(page.getByText('revenue this month', { exact: true })).toBeVisible()
    })

    test('expense breakdown shows categories', async ({ page }) => {
      await page.goto('/app/integrations')
      const heading = page.getByText('Where the money goes')
      await heading.scrollIntoViewIfNeeded()
      await expect(heading).toBeVisible()
    })

    test('accounting tab shows connections', async ({ page }) => {
      await page.goto('/app/integrations')
      await page.getByRole('button', { name: 'Accounting' }).click()
      await expect(page.getByText('QuickBooks Online')).toBeVisible()
    })

    test('time tab shows sources', async ({ page }) => {
      await page.goto('/app/integrations')
      await page.getByRole('button', { name: 'Time & Scheduling' }).click()
      await expect(page.getByText('Gusto')).toBeVisible()
    })
  })

  test.describe('Import Wizard', () => {
    test('shows import type selector', async ({ page }) => {
      await page.goto('/app/import')
      await expect(page.getByText('Bring Your Mess')).toBeVisible()
      await expect(page.getByText('Equity Balances')).toBeVisible()
    })
  })

  test.describe('Onboarding Wizard', () => {
    test('full onboarding flow works', async ({ page }) => {
      await page.goto('/app/onboarding')
      await expect(page.getByText('Welcome to Communis')).toBeVisible()
      await page.getByPlaceholder(/evergreen/i).fill('Test Co-op')
      await page.getByRole('button', { name: /get started/i }).click()
      await expect(page.getByText('What kind of cooperative?')).toBeVisible()
      await page.getByText('Cleaning Cooperative').click()
      await page.getByRole('button', { name: /configure bylaws/i }).click()
      await expect(page.getByText('Your bylaws')).toBeVisible()
      await page.getByRole('button', { name: /add members/i }).click()
      await page.getByRole('button', { name: /complete setup/i }).click()
      await expect(page.getByText('Test Co-op is ready')).toBeVisible()
    })
  })

  test.describe('NRI Compass', () => {
    test('compass button opens drawer', async ({ page }) => {
      await page.goto('/app')
      await page.getByLabel('Open NRI Compass').click()
      await expect(page.getByText('NRI Compass')).toBeVisible()
    })

    test('quick prompts work', async ({ page }) => {
      await page.goto('/app')
      await page.getByLabel('Open NRI Compass').click()
      await page.getByRole('button', { name: "What's my current equity balance?" }).click()
      await expect(page.getByText(/current equity balance is/)).toBeVisible({ timeout: 3000 })
    })

    test('free-form message works', async ({ page }) => {
      await page.goto('/app')
      await page.getByLabel('Open NRI Compass').click()
      await page.getByPlaceholder(/ask about your cooperative/i).fill('How is patronage calculated?')
      await page.locator('form button[type="submit"]').click()
      await expect(page.getByText(/patronage is calculated based on hours/i)).toBeVisible({ timeout: 3000 })
    })

    test('scope guardrails block off-topic', async ({ page }) => {
      await page.goto('/app')
      await page.getByLabel('Open NRI Compass').click()
      await page.getByPlaceholder(/ask about your cooperative/i).fill('Write me a poem')
      await page.locator('form button[type="submit"]').click()
      await expect(page.getByText(/here to help with your cooperative/i)).toBeVisible({ timeout: 3000 })
    })
  })
})
