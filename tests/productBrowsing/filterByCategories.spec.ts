import test from "@playwright/test"
import HeaderCmp from "../../components/headerCmp/HeaderCmp"
import HomePage from "../../pages/homePage/HomePage"
import ProductCategoryPage from "../../pages/productCategoryPage/ProductCategoryPage"
import ProductPage from "../../pages/productPage/ProductPage"

test.describe("Filter by categories", () => {
  let headerCmp: HeaderCmp
  let homePage: HomePage
  let productThumbnail: ProductCategoryPage
  let productPage: ProductPage
  test.beforeEach(async ({ page }) => {
    headerCmp = new HeaderCmp(page)
    homePage = new HomePage(page)
    productThumbnail = new ProductCategoryPage(page)
    productPage = new ProductPage(page)
    await homePage.openHomePage()
  })

  test("Filter by category test", async ({ page }) => {
    await headerCmp.navigateToCategory("Tablets")
    await homePage.validatePageTitle("Tablets")
    await headerCmp.navigateToCategory("Desktops", "Mac")
    await homePage.validatePageTitle("Mac")
    await headerCmp.navigateToCategory("Laptops & Notebooks", "Show All")
    await homePage.validatePageTitle("Laptops & Notebooks")
  })

  test("Filter by category and add item to cart", async ({ page }) => {
    await headerCmp.navigateToCategory("Desktops", "Mac")
    await homePage.validatePageTitle("Mac")
    await productThumbnail.addProductToCart("IMac")
    await productPage.validatePageTitle("IMac")
    await productPage.addToCart()
  })
})
