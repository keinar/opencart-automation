import { test, expect } from "@playwright/test"
import RegistrationPage from "../Pages/RegistrationPage"
import MyAccountPage from "../pages/MyAccountPage"

test.describe("Sanity test suite", () => {
  test.beforeEach(async ({ page }) => {
    const myAccountPage = new MyAccountPage(page)
    await page.goto("https://demo.opencart.com/")
    await myAccountPage.handleVerificationPage()
  })

  test("Search for PC", { tag: ["@critical-bug"] }, async ({ page }) => {
    // await basePage.searchForText("PC")
    await expect(page).toHaveURL("https://demo.opencart.com/index.php?route=product/search&search=PC")
    // await expect(page).toHaveURL("https://demo.opencart.com/error.html")
  })

  test("Select currency from dropdown", async ({ page }) => {
    // const basePage = new BasePage(page)
    // await basePage.changeCurrency("€")
  })
})
