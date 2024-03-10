import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage/BasePage"

export default class SearchPage extends BasePage {
  private searchCriteriaField: Locator
  private categorySearchDropdown: Locator
  private searchByDescriptionCheckbox: Locator
  private searchBySubcategoryCheckbox: Locator
  private searchButtonSubmit: Locator

  constructor(protected page: Page) {
    super(page)
    this.searchCriteriaField = page.locator('[id="input-search"]')
    this.categorySearchDropdown = page.locator('[id="input-category"]')
    this.searchByDescriptionCheckbox = page.locator('[name="description"]')
    this.searchByDescriptionCheckbox = page.locator('[name="subcategories"]')
    this.searchButtonSubmit = page.locator('[id="button-search"]')
  }

  public async searchCriteria(textToFill: string) {
    await this.fillText(this.searchCriteriaField, textToFill)
  }

  public async selectCategory(category: string) {
    await this.categorySearchDropdown.selectOption(category)
  }

  public async checkSearchByDescription() {
    await this.searchByDescriptionCheckbox.check()
  }

  public async checkSearchBySubcategories() {
    await this.searchBySubcategoryCheckbox.check()
  }

  public async submitSearch() {
    await this.clickElement(this.searchButtonSubmit)
  }
}
