import test, { Locator, Page, expect } from "@playwright/test"
import ApplicationURL from "../helpers/ApplicationURL"

export abstract class BasePage {
  private searchField: Locator
  private searchButton: Locator
  private categoryMenuItems: Locator
  private dropDownMenu: Locator
  protected alertWarningMsg: Locator

  constructor(protected page: Page) {
    this.searchField = page.locator('[name="search"]')
    this.searchButton = page.locator('[class="btn btn-light btn-lg"]')
    this.categoryMenuItems = page.locator('[class="nav navbar-nav"] > li')
    this.dropDownMenu = page.locator('[class="dropdown-menu show"]')
    this.alertWarningMsg = page.locator('[class="alert alert-danger alert-dismissible"]')
  }

  public async validatePageUrl(url: string) {
    await test.step(`Validating that a correct value of URL is ${url}`, async () => {
      await expect(this.page).toHaveURL(url)
    })
  }

  public async validatePageUrlIncludes(pageUrl: string) {
    await test.step(`Validating that a correct value of URL is includes ${pageUrl}`, async () => {
      const urlPattern = new RegExp(pageUrl)
      await expect(this.page).toHaveURL(urlPattern)
    })
  }

  public async validatePageTitle(title: string) {
    await this.validateElementText(this.page.locator("h1"), title)
  }

  protected async validateElementText(element: Locator, expectedText: string) {
    await test.step(`Validating that a correct elemet text is  ${expectedText}`, async () => {
      await expect(element).toContainText(expectedText)
    })
  }

  protected async clickElement(element: Locator) {
    await test.step(`Clicking the '${element}' element`, async () => {
      await element.waitFor({ state: "visible" })
      await element.click()
    })
  }

  protected async fillText(element: Locator, textToFill: string) {
    await test.step(`Filling '${textToFill}' into the '${element}' element`, async () => {
      await element.fill(textToFill)
    })
  }

  public async searchForText(textToFill: string) {
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

  // Handle Cloudflare verification
  public async handleVerificationPage() {
    await this.page.goto(ApplicationURL.BASE_URL)
    await this.page.waitForTimeout(5000)
    if (await this.page.locator('[id="challenge-running"]').isVisible()) {
      await this.page.frameLocator('iframe[title="Widget containing a Cloudflare security challenge"]').getByLabel("Verify you are human").check()
      await this.page.waitForTimeout(5000)
      if (await this.page.locator('[id="challenge-running"]').isVisible()) {
        await this.handleVerificationPage()
      }
    }
  }

  public async validateAlertMessage(message: string) {
    await expect(this.alertWarningMsg).toContainText(message)
  }
}
