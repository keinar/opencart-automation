import test from "@playwright/test"
import SearchPage from "../../pages/SearchPage"
import ApplicationURL from "../../helpers/ApplicationURL"
import HeaderCmp from "../../components/HeaderCmp"

//Search for products using keywords
test.describe("Search for products", () => {
  let searchPage: SearchPage
  let headerCmp: HeaderCmp

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page)
    headerCmp = new HeaderCmp(page)
    await page.goto(ApplicationURL.BASE_URL)
    await searchPage.handleVerificationPage()
  })

  // Can't continue due internal server error
  test("Search for products", { tag: ["@critical-bug"] }, async ({ page }) => {
    test.step("Search for product from header", async () => {
      await headerCmp.searchTextFromHeader("MacBook")
    })
  })

  test("Empty search", async ({ page }) => {
    test.step("Search for product from header", async () => {
      await headerCmp.searchTextFromHeader("")
    })
  })
})
