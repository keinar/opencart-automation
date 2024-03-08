import { Locator, Page } from "@playwright/test"
import { BasePage } from "./BasePage"
import CheckoutPageLocators from "./PagesLocators/CheckoutPageLocators"

export default class CheckoutPage extends BasePage {
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
    this.firstName = page.locator(CheckoutPageLocators.FIRST_NAME)
    this.lastName = page.locator(CheckoutPageLocators.LAST_NAME)
    this.address = page.locator(CheckoutPageLocators.ADDRESS)
    this.city = page.locator(CheckoutPageLocators.CITY)
    this.country = page.locator(CheckoutPageLocators.COUNTRY)
    this.state = page.locator(CheckoutPageLocators.STATE)
    this.submitAddressButton = page.locator(CheckoutPageLocators.SUBMIT_ADDRESS_BUTTON)
    this.paymentMethodDropdown = page.locator(CheckoutPageLocators.PAYMENT_METHOD_DROPDOWN)
    this.confirmPaymentButton = page.locator(CheckoutPageLocators.CONFIRM_PAYMENT_BUTTON)
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
