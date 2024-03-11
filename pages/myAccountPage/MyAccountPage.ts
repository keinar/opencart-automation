import { Locator, Page, expect } from "@playwright/test"
import { locators } from "./MyAccountPageLocarors"
import { BasePage } from "../basePage/BasePage"

export default class MyAccountPage extends BasePage {
  private usernameField: Locator
  private passwordField: Locator
  private loginButton: Locator
  private registerButton: Locator

  constructor(protected page: Page) {
    super(page)
    this.usernameField = page.locator(locators.usernameField)
    this.passwordField = page.locator(locators.passwordField)
    this.loginButton = page.locator(locators.loginButton)
    this.registerButton = page.locator(locators.registerButton)
  }

  public async loginToApplication(username: string, Password: string) {
    await this.usernameField.fill(username)
    await this.passwordField.fill(Password)
    await this.loginButton.click()
  }

  public async registerToApplicationButton() {
    await this.registerButton.click()
  }
}
