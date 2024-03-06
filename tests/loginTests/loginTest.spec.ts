import { test } from "@playwright/test"
import MyAccountPage from "../../pages/MyAccountPage"
import ApplicationURL from "../../helpers/ApplicationURL"

test.describe("Login to Application scenario", () => {
  let myAccountPage: MyAccountPage

  test.beforeEach(async ({ page }) => {
    myAccountPage = new MyAccountPage(page)
    await page.goto(ApplicationURL.BASE_URL)
    await myAccountPage.handleVerificationPage()
  })

  test("Positive login - valid credentials", async ({ page }) => {
    await myAccountPage.navigateTopMenu("My Account", "Login")
    await myAccountPage.loginToApplication("keinarelkayam@gmail.com", "1234")
    await myAccountPage.validatePageUrlIncludes("account/account")
  })

  test("Negative login - invalid credentials", async ({ page }) => {
    await myAccountPage.navigateTopMenu("My Account", "Login")
    await myAccountPage.loginToApplication("negative@gmail.com", "1234")
    await myAccountPage.validateAlertMessage("Warning: No match for E-Mail Address and/or Password.")
    await myAccountPage.validatePageUrlIncludes("account/account")
  })
})
