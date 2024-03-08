import { test } from "@playwright/test"
import MyAccountPage from "../../pages/MyAccountPage"
import HomePage from "../../pages/HomePage"
import ApplicationURL from "../../helpers/ApplicationURL"
import AlertErrorMessage from "../../helpers/AlertErrorMessage"
import HeaderCmp from "../../components/HeaderCmp"

test.describe("Login to Application scenario", () => {
  let myAccountPage: MyAccountPage
  let homePage: HomePage
  let headerCmp: HeaderCmp

  test.beforeEach(async ({ page }) => {
    myAccountPage = new MyAccountPage(page)
    homePage = new HomePage(page)
    headerCmp = new HeaderCmp(page)
    await page.goto(ApplicationURL.BASE_URL)
    await homePage.openHomePage()
  })

  test("Negative login - invalid credentials", async ({ page }) => {
    await headerCmp.navigateTopMenu("My Account", "Login")
    await myAccountPage.loginToApplication("negative@gmail.com", "1234")
    await myAccountPage.validateAlertWarningMessage(AlertErrorMessage.E_MAIL_VALIDATION)
    await myAccountPage.validatePageUrlIncludes("account/account")
  })
})
