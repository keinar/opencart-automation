import { Page } from "@playwright/test"
import { BasePage } from "./BasePage"
import ApplicationURL from "../helpers/ApplicationURL"

export default class HomePage extends BasePage {
  constructor(protected page: Page) {
    super(page)
  }

  public async openHomePage() {
    await this.page.goto(ApplicationURL.BASE_URL)
    await this.validatePageUrl(ApplicationURL.BASE_URL || ApplicationURL.BASE_URL + "index.php?route=common/home&language=en-gb")
  }
}
