import test from "@playwright/test"
import HomePage from "../../pages/homePage/HomePage"
import HeaderCmp from "../../components/headerCmp/HeaderCmp"

test.describe("Currency replacement", () => {
  let headerCmp: HeaderCmp
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    headerCmp = new HeaderCmp(page)
    homePage = new HomePage(page)
    await homePage.openHomePage()
  })

  test("Select Pound currency", async ({ page }) => {
    await headerCmp.selectCurrency("£ Pound Sterling")
  })

  test("Select Euro currency", async ({ page }) => {
    await headerCmp.selectCurrency("€ Euro")
  })

  test("Select Dollar currency", async ({ page }) => {
    await headerCmp.selectCurrency("$ US Dollar")
  })
})
