import { test, expect } from "@playwright/test"
import ApplicationURL from "../helpers/ApplicationURL"
import { faker } from "@faker-js/faker"
import HeaderCmp from "../components/headerCmp/HeaderCmp"
import HomePage from "../pages/homePage/HomePage"
import ProductCategoryPage from "../pages/productCategoryPage/ProductCategoryPage"
import CartPage from "../pages/cartPage/CartPage"
import CheckoutPage from "../pages/checkoutPage/CheckoutPage"
import ShoppingCartCmp from "../components/shoppingCartModalCmp/ShoppingCartCmp"
import { AlertPopupCmp } from "../components/alertPopupCmp/AlertPopupCmp"

test.describe("Sanity E2E Tests for OpenCart Demo Store", { tag: "@sanity" }, () => {
  let headerCmp: HeaderCmp
  let homePage: HomePage
  let productCategoryPage: ProductCategoryPage
  let cartPage: CartPage
  let checkoutPage: CheckoutPage
  let shoppingCartCmp: ShoppingCartCmp
  let alertPopupCmp: AlertPopupCmp

  test.beforeEach(async ({ page }) => {
    headerCmp = new HeaderCmp(page)
    shoppingCartCmp = new ShoppingCartCmp(page)
    alertPopupCmp = new AlertPopupCmp(page)
    homePage = new HomePage(page)
    productCategoryPage = new ProductCategoryPage(page)
    cartPage = new CartPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await homePage.openHomePage()
  })

  test("Complete E2E Sanity Check", async ({ page }) => {
    test.step("validate shopping cart count is empty", async () => {
      await shoppingCartCmp.validateShoppingCartCount(0)
    })

    test.step("add featured product to cart", async () => {
      await homePage.addFeaturedProductToCart("MacBook")
      await alertPopupCmp.validateAlertSuccessMessage("MacBook", "shopping cart")
    })

    test.step("validate shopping cart count is 1", async () => {
      await shoppingCartCmp.validateShoppingCartCount(1)
    })

    test.step("open shopping cart modal and validate product added", async () => {
      await shoppingCartCmp.clickToOpenShoppingCart()
      await shoppingCartCmp.validateProductOnCartModal("MacBook")
    })

    test.step("navigate to cart page from shopping cart modal", async () => {
      await shoppingCartCmp.navigateToCartFromCartModal()
      await shoppingCartCmp.validatePageTitle("Shopping Cart")
    })

    test.step("validate product on cart page and proceed to checkout", async () => {
      await cartPage.validateProductOnCartTable("MacBook")
      await cartPage.clickProcceedToCheckoutButton()
      await shoppingCartCmp.validatePageTitle("Checkout")
    })

    test.step("fill checkout form", async () => {
      await checkoutPage.fillCheckoutForm(faker.person.firstName(), faker.person.lastName(), faker.location.streetAddress(), faker.location.city(), faker.location.country(), faker.location.state())
      await checkoutPage.clickSubmitAddressButton()
      await checkoutPage.selectPaymentMethod("Bank Transfer")
      await checkoutPage.clickConfirmPaymentButton()
      await shoppingCartCmp.validatePageTitle("Order Confirmation")
    })
  })
})
