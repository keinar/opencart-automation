import { test } from "@playwright/test"
import MyAccountPage from "../../pages/MyAccountPage"
import ApplicationURL from "../../helpers/ApplicationURL"
import AlertErrorMessage from "../../helpers/AlertErrorMessage"

test.describe("Login to Application scenario", () => {
  let myAccountPage: MyAccountPage

  test.beforeEach(async ({ page }) => {
    myAccountPage = new MyAccountPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await myAccountPage.openHomePage()
  })

  test("Negative login - invalid credentials", async ({ page }) => {
    await myAccountPage.navigateTopMenu("My Account", "Login")
    await myAccountPage.loginToApplication("negative@gmail.com", "1234")
    await myAccountPage.validateAlertWarningMessage(AlertErrorMessage.E_MAIL_VALIDATION)
    await myAccountPage.validatePageUrlIncludes("account/account")
  })
})
