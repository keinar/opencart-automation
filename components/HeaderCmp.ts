import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../pages/BasePage"
import HeaderCmpLocators from "./HeaderCmpLocators"

export default class HeaderCmp extends BasePage {
  private searchField: Locator
  private searchButton: Locator
  private categoryMenuItems: Locator
  private dropDownMenu: Locator
  private shoppingCartButton: Locator
  private shoppingCartModal: Locator
  constructor(protected page: Page) {
    super(page)
    this.searchField = page.locator(HeaderCmpLocators.SEARCH_FIELD)
    this.searchButton = page.locator(HeaderCmpLocators.SEARCH_BUTTON)
    this.categoryMenuItems = page.locator(HeaderCmpLocators.CATEGORY_MENU_ITEM)
    this.dropDownMenu = page.locator(HeaderCmpLocators.DROPDOWN_MENU)
    this.shoppingCartButton = page.locator(HeaderCmpLocators.SHOPPING_CART_BUTTON)
    this.shoppingCartModal = page.locator(HeaderCmpLocators.SHOPPING_CART_MODAL)
  }

  public async searchTextFromHeader(textToFill: string) {
    await this.searchField.fill(textToFill)
    await this.searchButton.click()
  }

  public async navigateTopMenu(topMenuItem: string, subTopItem?: string) {
    const menuItemLocator = this.page.locator(`[id="top"] .list-inline > li span:has-text("${topMenuItem}")`)

    if (await menuItemLocator.isVisible()) {
      await menuItemLocator.click()
      if (subTopItem) {
        await this.page.locator(`[class="dropdown-menu dropdown-menu-right show"] li a:has-text("${subTopItem}")`).click()
      }
    } else {
      throw new Error(`Menu item with text "${topMenuItem}" not found`)
    }
  }

  public async selectCurrency(currency: "€ Euro" | "£ Pound Sterling" | "$ US Dollar") {
    await this.page.locator('[id="form-currency"]').click()
    await this.page.locator(`[class="dropdown-menu show"] li a:has-text("${currency}")`).click()
  }

  /**
   * Navigates to a specified category and optionally a subcategory within an e-commerce platform.
   * @param {string} categoryName - The name of the main category to navigate to.
   * @param {string} [subCategoryName] - The name of the subcategory to navigate to. If 'Show All' is passed, all categories will be displayed. This parameter is optional.
   */
  public async navigateToCategory(categoryName: string, subCategoryName?: string) {
    await this.clickElement(this.categoryMenuItems.locator(` > a:has-text("${categoryName}")`))
    if (subCategoryName) {
      await this.clickElement(this.dropDownMenu.locator(`a:has-text("${subCategoryName}")`))
    }
    await this.validatePageUrlIncludes("product/category")
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
