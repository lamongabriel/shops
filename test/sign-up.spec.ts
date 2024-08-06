import { expect, test } from '@playwright/test'

test('Sign up with correct credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  // Fill inputs
  await page.getByPlaceholder("Dan's Cookie Store").fill('John Doe Restaurant')
  await page.getByPlaceholder('Dan Schneider').fill('John Doe')
  await page.getByPlaceholder('dan@cookiestore.com').fill('johndoe@example.com')
  await page.getByPlaceholder('(123) 456-').fill('999999999')

  // Click button
  await page.getByRole('button', { name: 'Create free account' }).click()

  const toast = page.getByText('Restaurant succesfully created.')

  expect(toast).toBeVisible()
})

test('Sign up with wrong credentials', async ({ page }) => {
  await page.goto('/sign-up', { waitUntil: 'networkidle' })

  // Fill inputs
  await page.getByPlaceholder("Dan's Cookie Store").fill('John Doe Restaurant')
  await page.getByPlaceholder('Dan Schneider').fill('John Doe')
  await page.getByPlaceholder('dan@cookiestore.com').fill('error@example.com')
  await page.getByPlaceholder('(123) 456-').fill('999999999')

  // Click button
  await page.getByRole('button', { name: 'Create free account' }).click()

  const toast = page.getByText('Error creating restaurant.')

  expect(toast).toBeVisible()
})
