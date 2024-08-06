import { expect, test } from '@playwright/test'

test('Display correct dashboard amount metric', async ({ page }) => {
  await page.goto('/dashboard', { waitUntil: 'networkidle' })

  await expect(page.getByText('20', { exact: true }).first()).toBeVisible()
  await expect(page.getByText('20', { exact: true }).nth(1)).toBeVisible()
  await expect(page.getByText('20', { exact: true }).nth(2)).toBeVisible()
  await expect(page.getByText('$')).toBeVisible()
})
