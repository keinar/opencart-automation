import test, { Locator, Page, expect } from "@playwright/test"
import { locators } from "./AlertPopupCmpLolcators"

export class AlertPopupCmp {
  protected alertWarningMsg: Locator
  protected alertSuccessMsg: Locator

  constructor(protected page: Page) {
    this.alertWarningMsg = page.locator(locators.alertWarningMsg)
    this.alertSuccessMsg = page.locator(locators.alertSuccessMsg)
  }

  public async validateAlertWarningMessage(message: string) {
    await expect(this.alertWarningMsg).toContainText(message)
  }

  public async validateAlertSuccessMessage(productName: string, action: string) {
    const alertSuccessSelector = ".alert.alert-success.alert-dismissible"

    const alertTextContent = await this.page.textContent(alertSuccessSelector)

    const expectedMessageStart = `Success: You have added ${productName} to your `
    const expectedActions = {
      "shopping cart": "shopping cart",
      "product comparison": "product comparison",
      "wish list": "wish list",
    }
    expect(alertTextContent).toContain(expectedMessageStart)
    expect(alertTextContent).toContain(expectedActions[action])
  }
}
