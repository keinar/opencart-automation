import test, { Locator, Page, expect } from "@playwright/test"
import ApplicationURL from "../helpers/ApplicationURL"

export abstract class BasePage {
  protected alertWarningMsg: Locator
  protected alertSuccessMsg: Locator
  protected pageTitle: Locator

  constructor(protected page: Page) {
    this.alertWarningMsg = page.locator('[class="alert alert-danger alert-dismissible"]')
    this.alertSuccessMsg = page.locator('[class="alert alert-success alert-dismissible"]')
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
      await element.scrollIntoViewIfNeeded()
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
}
