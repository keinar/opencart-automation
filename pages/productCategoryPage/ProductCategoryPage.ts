import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../BasePage"
import { locators } from "./ProductCategoryPageLocators"

export default class ProductCategoryPage extends BasePage {
  private asideMenuContainer: Locator
  private categoryTitle: Locator

  constructor(protected page: Page) {
    super(page)
    this.asideMenuContainer = page.locator(locators.asideMenuContainer)
    this.categoryTitle = page.locator(locators.categoryTitle)
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

  //sorting filters
  public async sortByFilter(filter: string) {}

  //pagination
  public async goToNextPage() {}

  //showing products list / grid view
  public async changeView(view: string) {}

  // add to cart / add to wish list / compare buttons

  // product item
}
