import { expect, test } from '@playwright/test'

test('Update profile succesfully', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Name').fill('Rocket Pizza')

  await page.getByRole('button', { name: 'Update' }).click()

  await page.waitForLoadState('networkidle')

  const toast = await page.getByText('Profile updated')

  expect(toast).toBeVisible()

  await page.locator('form').getByRole('button', { name: 'Close' }).click()

  await page.waitForTimeout(1000)

  expect(page.getByRole('button', { name: 'Rocket Pizza' })).toBeVisible()
})

test('Update profile with error', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Pizza Shop' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Name').fill('Error Pizza')

  await page.getByRole('button', { name: 'Update' }).click()

  await page.waitForLoadState('networkidle')

  const toast = await page.getByText('Error, please try again!')

  expect(toast).toBeVisible()
})
