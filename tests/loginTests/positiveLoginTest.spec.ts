import { test } from "@playwright/test"
import ApplicationURL from "../../helpers/ApplicationURL"
import HomePage from "../../pages/homePage/HomePage"
import HeaderCmp from "../../components/headerCmp/HeaderCmp"
import MyAccountPage from "../../pages/myAccountPage/MyAccountPage"

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

  test("Positive login - valid credentials", async ({ page }) => {
    const email = process.env.CORRECT_EMAIL_ADDRESS as string
    const password = process.env.CORRECT_PASSWORD as string
    await headerCmp.navigateTopMenu("My Account", "Login")
    await myAccountPage.loginToApplication(email, password)
    // await myAccountPage.validatePageUrlIncludes("account/account")
  })
})
