import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export default class CheckoutPage extends BasePage {
  private checkoutPageTitle: Locator
  private firstName: Locator
  private lastName: Locator
  private address: Locator
  private city: Locator
  private country: Locator
  private state: Locator
  private submitAddressButton: Locator
  private paymentMethodDropdown: Locator
  private confirmPaymentButton: Locator

  constructor(protected page: Page) {
    super(page)
    this.checkoutPageTitle = page.locator("h1")
    this.firstName = page.locator('[name="firstname"]')
    this.lastName = page.locator('[name="lastname"]')
    this.address = page.locator('[name="address_1"]')
    this.city = page.locator('[name="city"]')
    this.country = page.locator('[name="country_id"]')
    this.state = page.locator('[name="zone_id"]')
    this.submitAddressButton = page.locator('[id="button-payment-address"]')
    this.paymentMethodDropdown = page.locator('[id="input-payment-method"]')
    this.confirmPaymentButton = page.locator('[class="text-end"] button')
  }

  public async validatePageTitle(title: string) {
    await this.validateElementText(this.checkoutPageTitle, title)
  }

  public async fillCheckoutForm(firstname: string, lastname: string, address: string, city: string, country: string, state: string) {
    await this.firstName.fill(firstname)
    await this.lastName.fill(lastname)
    await this.address.fill(address)
    await this.city.fill(city)
    await this.country.selectOption(country)
    await this.state.selectOption(state)
  }

  public async clickSubmitAddressButton() {
    await this.clickElement(this.submitAddressButton)
  }

  public async selectPaymentMethod(paymentMethod: string) {
    await this.paymentMethodDropdown.selectOption(paymentMethod)
  }

  public async clickConfirmPaymentButton() {
    await this.clickElement(this.confirmPaymentButton)
  }
}
