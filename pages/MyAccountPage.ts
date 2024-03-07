import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export default class MyAccountPage extends BasePage {
  private usernameField: Locator
  private passwordField: Locator
  private loginButton: Locator
  private registerButton: Locator

  constructor(protected page: Page) {
    super(page)
    this.usernameField = page.locator('[id="input-email"]')
    this.passwordField = page.locator('[id="input-password"]')
    this.loginButton = page.locator('[type="submit"]:has-text("Login")')
    this.registerButton = page.locator('[class="btn btn-primary"]:has-text("Continue")')
  }

  public async loginToApplication(username: string, Password: string) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(Password)
    await this.loginButton.click()
  }

  public async validateAlertWarningMessage(message: string) {
    await expect(this.alertWarningMsg).toContainText(message)
  }

  public async registerToApplicationButton() {
    await this.registerButton.click()
  }
}
