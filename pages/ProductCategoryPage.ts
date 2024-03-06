import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export default class ProductCategoryPage extends BasePage {
  private asideMenuContainer: Locator
  private categoryTitle: Locator

  constructor(protected page: Page) {
    super(page)
    this.asideMenuContainer = page.locator('[id="column-left"]')
    this.categoryTitle = page.locator('[id="content"] h2')
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
}
