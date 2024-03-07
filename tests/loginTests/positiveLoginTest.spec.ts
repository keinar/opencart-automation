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

  test("Positive login - valid credentials", async ({ page }) => {
    const email = process.env.CORRECT_EMAIL_ADDRESS as string
    const password = process.env.CORRECT_PASSWORD as string
    await myAccountPage.navigateTopMenu("My Account", "Login")
    await myAccountPage.loginToApplication(email, password)
    await myAccountPage.validatePageUrlIncludes("account/account")
  })
})
