import test, { Locator, Page, expect } from "@playwright/test"
import ApplicationURL from "../../helpers/ApplicationURL"
import { locators } from "./BasePageLocators"

export abstract class BasePage {
  protected pageTitle: Locator

  constructor(protected page: Page) {
    this.pageTitle = page.locator(locators.pageTitle)
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
      await element.scrollIntoViewIfNeeded()
      await element.waitFor({ state: "visible" })
      await element.click()
    })
  }

  protected async fillText(element: Locator, textToFill: string) {
    await test.step(`Filling '${textToFill}' into the '${element}' element`, async () => {
      await element.fill(textToFill)
    })
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
}
