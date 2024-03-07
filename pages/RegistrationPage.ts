import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

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
    this.firstName = page.locator('[name="firstname"]')
    this.lastName = page.locator('[name="lastname"]')
    this.email = page.locator('[name="email"]')
    this.password = page.locator('[name="password"]')
    this.confirmSubscription = page.locator('[id="input-newsletter-yes"]')
    this.privacyPolicy = page.locator('[name="agree"]')
    this.submitButton = page.locator('[type="submit"]:has-text("Continue")')
    this.validationFieldError = page.locator('[class="invalid-feedback d-block"]')
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
