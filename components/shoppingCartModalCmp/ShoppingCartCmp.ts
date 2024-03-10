import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../../pages/basePage/BasePage"
import { locators } from "./ShoppingCartCmpLocators"

export default class shoopingCartModal extends BasePage {
  private shoppingCartButton: Locator
  private shoppingCartModal: Locator
  constructor(protected page: Page) {
    super(page)
    this.shoppingCartButton = page.locator(locators.shoppingCartButton)
    this.shoppingCartModal = page.locator(locators.shoopingCartModal)
  }

  public async clickToOpenShoppingCart() {
    await this.clickElement(this.shoppingCartButton)
  }

  public async validateProductOnCartModal(productName: string) {
    await expect(this.shoppingCartModal.locator('[class="text-start"]')).toContainText(productName)
  }

  public async navigateToCartFromCartModal() {
    await this.clickElement(this.shoppingCartModal.locator('[class="text-end"]:has-text(" View cart")'))
  }

  public async navigateToCheckoutFromCartModal() {
    await this.clickElement(this.shoppingCartModal.locator('[class="text-end"]:has-text(" Checkout")'))
  }

  public async validateShoppingCartCount(count: number) {
    await expect(this.shoppingCartButton).toContainText(count.toString() + "item(s)")
  }
}
