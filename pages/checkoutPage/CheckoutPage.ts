import { Locator, Page } from "@playwright/test"
import { BasePage } from "../BasePage"
import { locators } from "./CheckoutPageLocators"
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
    this.firstName = page.locator(locators.firstName)
    this.lastName = page.locator(locators.lastName)
    this.address = page.locator(locators.adress)
    this.city = page.locator(locators.city)
    this.country = page.locator(locators.country)
    this.state = page.locator(locators.state)
    this.submitAddressButton = page.locator(locators.submitAddressButton)
    this.paymentMethodDropdown = page.locator(locators.paymentMethodDropdown)
    this.confirmPaymentButton = page.locator(locators.confirmPaymentButton)
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
