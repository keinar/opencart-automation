import test from "@playwright/test"

test.describe("Filter by categories", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://demo.opencart.com/")
  })

  test("Filter by category", async ({ page }) => {})
})
