import { Locator } from "@playwright/test"

type Locators = {
  usernameField: string
  passwordField: string
  loginButton: string
  registerButton: string
}

export const locators: Locators = {
  usernameField: '[id="input-email"]',
  passwordField: '[id="input-password"]',
  loginButton: '[type="submit"]:has-text("Login")',
  registerButton: '[class="btn btn-primary"]:has-text("Continue")',
}
