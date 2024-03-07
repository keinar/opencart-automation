import { Page } from "@playwright/test"
import { BasePage } from "./BasePage"
import ApplicationURL from "../helpers/ApplicationURL"

export default class SearchPage extends BasePage {
  constructor(protected page: Page) {
    super(page)
  }

  public async searchForText(textToFill: string) {}
}
