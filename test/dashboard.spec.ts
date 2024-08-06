import { expect, test } from '@playwright/test'

test('Display correct dashboard amount metric', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' })

  expect(page.getByText('20', { exact: true }).first()).toBeVisible()
  expect(page.getByText('20', { exact: true }).nth(1)).toBeVisible()
  expect(page.getByText('20', { exact: true }).nth(2)).toBeVisible()
  expect(page.getByText('$')).toBeVisible()
})
