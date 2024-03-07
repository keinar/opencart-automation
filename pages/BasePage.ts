import test, { Locator, Page, expect } from "@playwright/test"
import ApplicationURL from "../helpers/ApplicationURL"

export abstract class BasePage {
  private searchField: Locator
  private searchButton: Locator
  private categoryMenuItems: Locator
  private dropDownMenu: Locator
  protected alertWarningMsg: Locator
  protected alertSuccessMsg: Locator
  protected shoppingCartButton: Locator
  protected shoppingCartModal: Locator
  protected pageTitle: Locator

  constructor(protected page: Page) {
    this.searchField = page.locator('[id="search"] input')
    this.searchButton = page.locator('[class="btn btn-light btn-lg"]')
    this.categoryMenuItems = page.locator('[class="nav navbar-nav"] > li')
    this.dropDownMenu = page.locator('[class="dropdown-menu show"]')
    this.alertWarningMsg = page.locator('[class="alert alert-danger alert-dismissible"]')
    this.alertSuccessMsg = page.locator('[class="alert alert-success alert-dismissible"]')
    this.shoppingCartButton = page.locator('[class="btn btn-inverse btn-block dropdown-toggle"]')
    this.shoppingCartModal = page.locator('[class="dropdown-menu dropdown-menu-right show"]')
    this.pageTitle = page.locator("h1")
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
    await this.validateElementText(this.pageTitle, title)
  }

  protected async validateElementText(element: Locator, expectedText: string) {
    await test.step(`Validating that a correct elemet text is  ${expectedText}`, async () => {
      await expect(element).toContainText(expectedText)
    })
  }

  protected async clickElement(element: Locator) {
    await test.step(`Clicking the '${element}' element`, async () => {
      await element.waitFor({ state: "visible" })
      await element.scrollIntoViewIfNeeded()
      await element.click()
    })
  }

  protected async fillText(element: Locator, textToFill: string) {
    await test.step(`Filling '${textToFill}' into the '${element}' element`, async () => {
      await element.fill(textToFill)
    })
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

  public async openHomePage() {
    await this.handleVerificationPage()
    await this.validatePageUrl(ApplicationURL.BASE_URL || ApplicationURL.BASE_URL + "index.php?route=common/home&language=en-gb")
  }

  public async validateAlertWarningMessage(message: string) {
    await expect(this.alertWarningMsg).toContainText(message)
  }

  public async validateAlertSuccessMessage(productName: string, action: string) {
    const alertSuccessSelector = ".alert.alert-success.alert-dismissible"

    // Retrieve the entire text content of the alert message
    const alertTextContent = await this.page.textContent(alertSuccessSelector)

    // Construct the expected dynamic parts of the message based on the parameters
    const expectedMessageStart = `Success: You have added ${productName} to your `
    const expectedActions = {
      "shopping cart": "shopping cart",
      "product comparison": "product comparison",
      "wish list": "wish list",
    }

    // Verify the start of the message matches the expected text
    expect(alertTextContent).toContain(expectedMessageStart)

    // Verify the specific action part of the message matches one of the expected actions
    expect(alertTextContent).toContain(expectedActions[action])
  }

  public async validateShoppingCartCount(count: number) {
    await expect(this.shoppingCartButton).toContainText(count.toString() + "item(s)")
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
}
