import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"
import CartPageLocators from "./PagesLocators/CartPageLocators"

export default class CartPage extends BasePage {
  private cartTable: Locator
  private procceedToCheckoutButton: Locator
  constructor(protected page: Page) {
    super(page)
    this.cartTable = page.locator(CartPageLocators.CART_TABLE)
    this.procceedToCheckoutButton = page.locator(CartPageLocators.PROCCEED_TO_CHECKOUT_BUTTON)
  }

  public async validateProductOnCartTable(productName: string) {
    await this.validateElementText(this.cartTable.locator('[class="text-start"] a'), productName)
  }

  public async clickProcceedToCheckoutButton() {
    await this.clickElement(this.procceedToCheckoutButton)
  }
}
