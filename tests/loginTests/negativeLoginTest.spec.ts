import { test } from "@playwright/test"
import ApplicationURL from "../../helpers/ApplicationURL"
import AlertErrorMessage from "../../helpers/AlertErrorMessage"
import HomePage from "../../pages/homePage/HomePage"
import HeaderCmp from "../../components/headerCmp/HeaderCmp"
import MyAccountPage from "../../pages/myAccountPage/MyAccountPage"
import { AlertPopupCmp } from "../../components/alertPopupCmp/AlertPopupCmp"

test.describe("Login to Application scenario", () => {
  let homePage: HomePage
  let headerCmp: HeaderCmp
  let myAccountPage: MyAccountPage
  let alertPopupCmp: AlertPopupCmp
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page)
    headerCmp = new HeaderCmp(page)
    myAccountPage = new MyAccountPage(page)
    alertPopupCmp = new AlertPopupCmp(page)
    await page.goto(ApplicationURL.BASE_URL)
    await homePage.openHomePage()
  })

  test("Negative login - invalid credentials", async ({ page }) => {
    await headerCmp.navigateTopMenu("My Account", "Login")
    await myAccountPage.loginToApplication("negative@gmail.com", "1234")
    // await alertPopupCmp.validateAlertWarningMessage(AlertErrorMessage.E_MAIL_VALIDATION)
    // await myAccountPage.validatePageUrlIncludes("account/account")
  })
})
