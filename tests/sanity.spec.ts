import { test, expect } from "@playwright/test"
import HomePage from "../pages/HomePage"
import ProductCategoryPage from "../pages/ProductCategoryPage"
import ApplicationURL from "../helpers/ApplicationURL"
import CartPage from "../pages/CartPage"
import CheckoutPage from "../pages/CheckoutPage"
import { faker } from "@faker-js/faker"
import HeaderCmp from "../components/HeaderCmp"

test.describe("Sanity E2E Tests for OpenCart Demo Store", () => {
  let headerCmp: HeaderCmp
  let homePage: HomePage
  let productCategoryPage: ProductCategoryPage
  let cartPage: CartPage
  let checkoutPage: CheckoutPage

  test.beforeEach(async ({ page }) => {
    headerCmp = new HeaderCmp(page)
    homePage = new HomePage(page)
    productCategoryPage = new ProductCategoryPage(page)
    cartPage = new CartPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await homePage.openHomePage()
  })

  test("Complete E2E Sanity Check", async ({ page }) => {
    test.step("validate shopping cart count is empty", async () => {
      await headerCmp.validateShoppingCartCount(0)
    })

    test.step("add featured product to cart", async () => {
      await homePage.addFeaturedProductToCart("MacBook")
      await headerCmp.validateAlertSuccessMessage("MacBook", "shopping cart")
    })

    test.step("validate shopping cart count is 1", async () => {
      await headerCmp.validateShoppingCartCount(1)
    })

    test.step("open shopping cart modal and validate product added", async () => {
      await headerCmp.clickToOpenShoppingCart()
      await headerCmp.validateProductOnCartModal("MacBook")
    })

    test.step("navigate to cart page from shopping cart modal", async () => {
      await headerCmp.navigateToCartFromCartModal()
      await cartPage.validatePageTitle("Shopping Cart")
    })

    test.step("validate product on cart page and proceed to checkout", async () => {
      await cartPage.validateProductOnCartTable("MacBook")
      await cartPage.clickProcceedToCheckoutButton()
      await checkoutPage.validatePageTitle("Checkout")
    })

    test.step("fill checkout form", async () => {
      await checkoutPage.fillCheckoutForm(faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.city(), faker.location.country(), faker.location.state())
      await checkoutPage.clickSubmitAddressButton()
      await checkoutPage.selectPaymentMethod("Bank Transfer")
      await checkoutPage.clickConfirmPaymentButton()
      await checkoutPage.validatePageTitle("Order Confirmation")
    })
  })
})
