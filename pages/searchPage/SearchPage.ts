import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage/BasePage"
import { locators } from "./SearchPageLocators"

export default class SearchPage extends BasePage {
  private searchCriteriaField: Locator
  private categorySearchDropdown: Locator
  private searchByDescriptionCheckbox: Locator
  private searchBySubcategoryCheckbox: Locator
  private searchButtonSubmit: Locator

  constructor(protected page: Page) {
    super(page)
    this.searchCriteriaField = page.locator(locators.searchCriteriaField)
    this.categorySearchDropdown = page.locator(locators.categorySearchDropdown)
    this.searchByDescriptionCheckbox = page.locator(locators.searchByDescriptionCheckbox)
    this.searchByDescriptionCheckbox = page.locator(locators.searchBySubcategoryCheckbox)
    this.searchButtonSubmit = page.locator(locators.searchButtonSubmit)
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
