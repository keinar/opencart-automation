import { Locator, Page, expect } from "@playwright/test"
import { locators } from "./HeaderCmpLocators"
import { BasePage } from "../../pages/basePage/BasePage"

export default class HeaderCmp extends BasePage {
  private searchField: Locator
  private searchButton: Locator
  private categoryMenuItems: Locator
  private dropDownMenu: Locator

  constructor(protected page: Page) {
    super(page)
    this.searchField = page.locator(locators.seachField)
    this.searchButton = page.locator(locators.searchButton)
    this.categoryMenuItems = page.locator(locators.categoryMenuItems)
    this.dropDownMenu = page.locator(locators.dropdownMenu)
  }

  public async searchTextFromHeader(textToFill: string) {
    await this.searchField.fill(textToFill)
    await this.searchButton.click()
  }

  public async navigateTopMenu(topMenuItem: string, subTopItem?: string): Promise<void> {
    const menuItemLocator = this.page.locator(`[id="top"] .list-inline > li span:has-text("${topMenuItem}")`)

    if (!(await menuItemLocator.isVisible())) {
      throw new Error(`Menu item with text "${topMenuItem}" not found`)
    }

    await menuItemLocator.click()

    if (subTopItem) {
      const subItemLocator = this.page.locator(`[class="dropdown-menu dropdown-menu-right show"] li a:has-text("${subTopItem}")`)
      if (!(await subItemLocator.isVisible())) {
        throw new Error(`Sub-menu item with text "${subTopItem}" not found`)
      }
      await subItemLocator.click()
    }
  }

  public async selectCurrency(currency: "€ Euro" | "£ Pound Sterling" | "$ US Dollar") {
    await this.clickElement(this.page.locator('[id="form-currency"]'))
    await this.clickElement(this.page.locator(`[class="dropdown-menu show"] li a:has-text("${currency}")`))
  }

  public async navigateToCategory(categoryName: string, subCategoryName?: string) {
    await this.clickElement(this.categoryMenuItems.locator(` > a:has-text("${categoryName}")`))
    if (subCategoryName) {
      await this.clickElement(this.dropDownMenu.locator(`a:has-text("${subCategoryName}")`))
    }
    await this.validatePageUrlIncludes("product/category")
  }
}
