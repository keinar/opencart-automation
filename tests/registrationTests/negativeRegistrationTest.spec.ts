import { test } from "@playwright/test"
import RegistrationPage from "../../pages/RegistrationPage"
import ApplicationURL from "../../helpers/ApplicationURL"
import { faker } from "@faker-js/faker"
import FieldErrorMessage from "../../helpers/FieldErrorMessage"

test.describe("Register to Application - negative scenarios", () => {
  let registrationPage: RegistrationPage
  // seed is used to generate random data and ensure that tests are repeatable
  // const SEED = 123
  // faker.seed(SEED)

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await registrationPage.openHomePage()
    await registrationPage.navigateTopMenu("My Account", "Register")
  })

  test("Negative registration, Privacy Policy not checked", async () => {
    await registrationPage.registerToApplication(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.internet.password())
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.submitRegistration()
    await registrationPage.validateAlertWarningMessage(FieldErrorMessage.PRIVACY_POLICY_VALIDATION)
  })

  test("Negative registration, invalid email", async () => {
    await registrationPage.registerToApplication(faker.person.firstName(), faker.person.lastName(), "test@gmail", faker.internet.password())
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validateValidationFieldError(FieldErrorMessage.E_MAIL_VALIDATION)
  })

  test("Negative registration, invalid password", async () => {
    await registrationPage.registerToApplication(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), "")
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validateValidationFieldError(FieldErrorMessage.PASSWORD_VALIDATION)
  })

  test("Negative registration, invalid firstname", async () => {
    await registrationPage.registerToApplication("", faker.person.lastName(), faker.internet.email(), faker.internet.password())
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validateValidationFieldError(FieldErrorMessage.FIRST_NAME_VALIDATION)
  })

  test("Negative registration, invalid lastname", async () => {
    await registrationPage.registerToApplication(faker.person.firstName(), "", faker.internet.email(), faker.internet.password())
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validateValidationFieldError(FieldErrorMessage.LAST_NAME_VALIDATION)
  })
})
