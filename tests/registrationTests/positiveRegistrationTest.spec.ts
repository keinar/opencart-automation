import { test } from "@playwright/test"
import ApplicationURL from "../../helpers/ApplicationURL"
import { faker } from "@faker-js/faker"
import HomePage from "../../pages/homePage/HomePage"
import HeaderCmp from "../../components/headerCmp/HeaderCmp"
import RegistrationPage from "../../pages/registrationPage/RegistrationPage"
import { AlertPopupCmp } from "c:/Users/Keinar/Desktop/opencart-automation/components/alertPopupCmp/AlertPopupCmp"
import MyAccountPage from "../../pages/myAccountPage/MyAccountPage"

test.describe("Register to Application - positive scenario", () => {
  let registrationPage: RegistrationPage
  let homePage: HomePage
  let headerCmp: HeaderCmp
  let myAccountPage: MyAccountPage

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page)
    myAccountPage = new MyAccountPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await homePage.openHomePage()
    await headerCmp.navigateTopMenu("My Account", "Register")
  })
  test("Positive registration", async () => {
    await registrationPage.registerToApplication(faker.person.firstName(), faker.person.lastName(), faker.internet.email(), faker.internet.password())
    await registrationPage.acceptNewsletterSubscription(true)
    await registrationPage.checkPrivacyPolicy()
    await registrationPage.submitRegistration()
    await myAccountPage.validatePageTitle("Your Account Has Been Created!")
  })
})
