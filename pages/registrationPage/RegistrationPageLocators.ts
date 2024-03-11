type locators = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmSubscription: string
  privacyPolicy: string
  submitButton: string
  validationFieldError: string
}

export const locators: locators = {
  firstName: '[name="firstname"]',
  lastName: '[name="lastname"]',
  email: '[name="email"]',
  password: '[name="password"]',
  confirmSubscription: '[id="input-newsletter-yes"]',
  privacyPolicy: '[name="agree"]',
  submitButton: '[type="submit"]:has-text("Continue")',
  validationFieldError: '[class="invalid-feedback d-block"]',
}
