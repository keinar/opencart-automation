import { Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export default class ProductPage extends BasePage {
  constructor(protected page: Page) {
    super(page)
  }

  // add to wish list button / compare button

  public async addToWishList() {}

  public async addToCompare() {}

  // add to cart button

  public async addToCart() {}

  // product tabs navigation

  public async productTabsNavigation() {}

  // write review

  public async writeReview(nameField: string, reviewField: string, rating: number) {}
}
