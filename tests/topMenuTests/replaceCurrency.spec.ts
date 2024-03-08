import test from "@playwright/test"
import HeaderCmp from "../../components/HeaderCmp"
import HomePage from "../../pages/HomePage"

test.describe("Currency replacement", () => {
  let headerCmp: HeaderCmp
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    headerCmp = new HeaderCmp(page)
    homePage = new HomePage(page)
    await headerCmp.handleVerificationPage()
    await homePage.openHomePage()
  })

  test("Select currency from dropdown", async ({ page }) => {
    test.step("Select Pound currency", async () => {
      await headerCmp.selectCurrency("£ Pound Sterling")
    })

    test.step("Select US Dollar currency", async () => {
      await headerCmp.selectCurrency("$ US Dollar")
    })

    test.step("Select Euro currency", async () => {
      await headerCmp.selectCurrency("€ Euro")
    })
  })
})
