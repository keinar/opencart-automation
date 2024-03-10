import { Locator, Page } from "@playwright/test"
import { BasePage } from "../BasePage"
import { locators } from "./CartPageLocators"

export default class CartPage extends BasePage {
  private cartTable: Locator
  private procceedToCheckoutButton: Locator
  constructor(protected page: Page) {
    super(page)
    this.cartTable = page.locator(locators.cartTable)
    this.procceedToCheckoutButton = page.locator(locators.procceedToCheckoutButton)
  }

  public async validateProductOnCartTable(productName: string) {
    await this.validateElementText(this.cartTable.locator('[class="text-start"] a'), productName)
  }

  public async clickProcceedToCheckoutButton() {
    await this.clickElement(this.procceedToCheckoutButton)
  }
}
