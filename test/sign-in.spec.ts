import { expect, test } from '@playwright/test'

test('Sign in with correct credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('dan@cookiestore.com').fill('johndoe@example.com')
  await page.getByRole('button', { name: 'Submit' }).click()

  const toast = page.getByText('A login link has been sent to your e-mail.')

  await expect(toast).toBeVisible()
})

test('Sign in with wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('dan@cookiestore.com').fill('wrong@example.com')
  await page.getByRole('button', { name: 'Submit' }).click()

  const toast = page.getByText('E-mail not found in the database.')

  await expect(toast).toBeVisible()
})
