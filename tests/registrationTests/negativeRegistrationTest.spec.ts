import { test } from "@playwright/test"
import ApplicationURL from "../../helpers/ApplicationURL"
import { faker } from "@faker-js/faker"
import FieldErrorMessage from "../../helpers/FieldErrorMessage"
import HomePage from "../../pages/homePage/HomePage"
import HeaderCmp from "../../components/headerCmp/HeaderCmp"
import RegistrationPage from "../../pages/registrationPage/RegistrationPage"
import MyAccountPage from "../../pages/myAccountPage/MyAccountPage"

test.describe("Register to Application - negative scenarios", () => {
  let registrationPage: RegistrationPage
  let homePage: HomePage
  let headerCmp: HeaderCmp
  let myAccountPage: MyAccountPage

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page)
    homePage = new HomePage(page)
    headerCmp = new HeaderCmp(page)
    myAccountPage = new MyAccountPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await homePage.openHomePage()
    await headerCmp.navigateTopMenu("My Account", "Register")
  })

  test("Negative registration, Privacy Policy not checked", async () => {
    await registrationPage.registerToApplication(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.internet.password())
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.submitRegistration()
    await myAccountPage.validateAlertWarningMessage(FieldErrorMessage.PRIVACY_POLICY_VALIDATION)
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
