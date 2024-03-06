import test from "@playwright/test"
import HomePage from "../../pages/HomePage"

test.describe("Validate top menu items", () => {
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.handleVerificationPage()
    await homePage.openHomePage()
  })

  test("Select currency from dropdown", async ({ page }) => {
    test.step("Select Pound currency", async () => {
      await homePage.selectCurrency("£ Pound Sterling")
    })

    test.step("Select US Dollar currency", async () => {
      await homePage.selectCurrency("$ US Dollar")
    })

    test.step("Select Euro currency", async () => {
      await homePage.selectCurrency("€ Euro")
    })
  })
})
