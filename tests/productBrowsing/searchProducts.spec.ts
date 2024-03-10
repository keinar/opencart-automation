import test from "@playwright/test"
import ApplicationURL from "../../helpers/ApplicationURL"
import HeaderCmp from "../../components/headerCmp/HeaderCmp"
import SearchPage from "../../pages/searchPage/SearchPage"
import HomePage from "../../pages/homePage/HomePage"

//Search for products using keywords
test.describe("Search for products", () => {
  let searchPage: SearchPage
  let headerCmp: HeaderCmp
  let homePage: HomePage

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page)
    headerCmp = new HeaderCmp(page)
    homePage = new HomePage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await homePage.openHomePage()
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
