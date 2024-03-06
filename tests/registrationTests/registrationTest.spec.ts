import { test } from "@playwright/test"
import RegistrationPage from "../../Pages/RegistrationPage"
import ApplicationURL from "../../helpers/ApplicationURL"

test.describe("Register to Application - positive and negative scenarios", () => {
  let registrationPage: RegistrationPage

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await registrationPage.handleVerificationPage()
  })
  test("Positive registration", async () => {
    await registrationPage.registerToApplication("keinar", "elkayam", "keinarelkayam@gmail.com", "K123e!")
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validatePageTitle("Your Account Has Been Created!")
  })

  test("Negative registration, Privacy Policy not checked", async () => {
    await registrationPage.registerToApplication("keinar", "elkayam", "keinarelkayam@gmail.com", "K123e!")
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.submitRegistration()
    await registrationPage.validateAlertMessage("Warning: You must agree to the Privacy Policy!")
  })

  test("Negative registration, invalid email", async () => {
    await registrationPage.registerToApplication("keinar", "elkayam", "keinarelkayam@gmail", "K123e!")
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validateValidationFieldError("E-Mail Address does not appear to be valid!")
  })

  test("Negative registration, invalid password", async () => {
    await registrationPage.registerToApplication("keinar", "elkayam", "keinarelkayam@gmail.com", "K")
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validateValidationFieldError("Password must be between 4 and 20 characters!")
  })

  test("Negative registration, invalid firstname", async () => {
    await registrationPage.registerToApplication("", "elkayam", "keinarelkayam@gmail.com", "K123e!")
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validateValidationFieldError("First Name must be between 1 and 32 characters!")
  })

  test("Negative registration, invalid lastname", async () => {
    await registrationPage.registerToApplication("keinar", "", "keinarelkayam@gmail.com", "K123e!")
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validateValidationFieldError("Last Name must be between 1 and 32 characters!")
  })
})
