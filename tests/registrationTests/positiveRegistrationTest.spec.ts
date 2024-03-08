import { test } from "@playwright/test"
import RegistrationPage from "../../pages/RegistrationPage"
import ApplicationURL from "../../helpers/ApplicationURL"
import { faker } from "@faker-js/faker"
import HomePage from "../../pages/HomePage"
import HeaderCmp from "../../components/HeaderCmp"

test.describe("Register to Application - positive scenario", () => {
  let registrationPage: RegistrationPage
  let homePage: HomePage
  let headerCmp: HeaderCmp
  // seed is used to generate random data and ensure that tests are repeatable
  // const SEED = 123
  // faker.seed(SEED)

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await homePage.openHomePage()
    await headerCmp.navigateTopMenu("My Account", "Register")
  })
  test("Positive registration", async () => {
    await registrationPage.registerToApplication(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.internet.password())
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await registrationPage.validatePageTitle("Your Account Has Been Created!")
  })
})
