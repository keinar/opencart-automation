import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "../basePage/BasePage"
import { locators } from "./RegistrationPageLocators"

export default class RegistrationPage extends BasePage {
  private firstName: Locator
  private lastName: Locator
  private email: Locator
  private password: Locator
  private confirmSubscription: Locator
  private privacyPolicy: Locator
  private submitButton: Locator
  private validationFieldError: Locator

  constructor(protected page: Page) {
    super(page)
    this.firstName = page.locator(locators.firstName)
    this.lastName = page.locator(locators.lastName)
    this.email = page.locator(locators.email)
    this.password = page.locator(locators.password)
    this.confirmSubscription = page.locator(locators.confirmSubscription)
    this.privacyPolicy = page.locator(locators.privacyPolicy)
    this.submitButton = page.locator(locators.submitButton)
    this.validationFieldError = page.locator(locators.validationFieldError)
  }

  public async registerToApplication(firstname: string, lastname: string, email: string, password: string) {
    await this.page.waitForSelector('[id="account-register"]', { state: "visible" })
    await this.validatePageTitle("Register Account")
    await this.firstName.fill(firstname)
    await this.lastName.fill(lastname)
    await this.email.fill(email)
    await this.password.fill(password)
  }

  public async acceptNewsletterSubscription(subscribe: boolean) {
    await this.confirmSubscription.check()
  }

  public async checkPrivacyPolicy() {
    await this.privacyPolicy.check()
  }

  public async submitRegistration() {
    await this.clickElement(this.submitButton)
  }

  public async validateValidationFieldError(message: string) {
    await expect(this.validationFieldError).toContainText(message)
  }
}
