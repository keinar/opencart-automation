import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export default class CartPage extends BasePage {
  private cartTable: Locator
  private procceedToCheckoutButton: Locator
  constructor(protected page: Page) {
    super(page)
    this.cartTable = page.locator('[class="table table-bordered"]')
    this.procceedToCheckoutButton = page.locator('[class="float-end"] a')
  }

  public async validateProductOnCartTable(productName: string) {
    await this.validateElementText(this.cartTable.locator('[class="text-start"] a'), productName)
  }

  public async clickProcceedToCheckoutButton() {
    await this.clickElement(this.procceedToCheckoutButton)
  }
}
