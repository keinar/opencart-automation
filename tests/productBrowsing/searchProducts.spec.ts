import test from "@playwright/test"
import SearchPage from "../../pages/SearchPage"
import ApplicationURL from "../../helpers/ApplicationURL"

//Search for products using keywords
test.describe("Search for products", () => {
  let searchPage: SearchPage

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await searchPage.handleVerificationPage()
  })

  // Can't continue due internal server error
  test("Search for products", { tag: ["@critical-bug"] }, async ({ page }) => {
    test.step("Search for product from header", async () => {
      await searchPage.searchTextFromHeader("MacBook")
    })
  })
})
