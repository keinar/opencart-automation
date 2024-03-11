import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../basePage/BasePage"
import { locators } from "./ProductCategoryPageLocators"

export default class ProductCategoryPage extends BasePage {
  private asideMenuContainer: Locator
  private categoryTitle: Locator
  private productThumbnail: Locator

  constructor(protected page: Page) {
    super(page)
    this.asideMenuContainer = page.locator(locators.asideMenuContainer)
    this.categoryTitle = page.locator(locators.categoryTitle)
    this.productThumbnail = page.locator(locators.productThumbnail)
  }

  public async navigateFromAsideMenu(mainCategory: string, subcategory?: string) {
    await this.asideMenuContainer.waitFor({ state: "visible" })
    await this.clickElement(this.asideMenuContainer.locator(`a:has-text("${mainCategory}")`))
    if (subcategory) {
      await this.clickElement(this.asideMenuContainer.locator(`a:has-text("${subcategory}")`))
      await expect(this.categoryTitle).toContainText(subcategory)
    } else {
      await this.categoryTitle.waitFor({ state: "visible" })
      await expect(this.categoryTitle).toContainText(mainCategory)
    }
  }

  public async addProductToCart(productTitle: string) {
    const product = this.productThumbnail.locator(`h4:has-text("${productTitle}")`)
    this.clickElement(product)
  }
}
