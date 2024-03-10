type Locators = {
  firstName: string
  lastName: string
  adress: string
  city: string
  country: string
  state: string
  submitAddressButton: string
  paymentMethodDropdown: string
  confirmPaymentButton: string
}

export const locators: Locators = {
  firstName: '[name="firstname"]',
  lastName: '[name="lastname"]',
  adress: '[name="address_1"]',
  city: '[name="city"]',
  country: '[name="country_id"]',
  state: '[name="zone_id"]',
  submitAddressButton: '[id="button-payment-address"]',
  paymentMethodDropdown: '[id="input-payment-method"]',
  confirmPaymentButton: '[class="text-end"] button',
}
