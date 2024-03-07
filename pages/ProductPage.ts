import { Page } from "@playwright/test"
import { BasePage } from "./BasePage"

export default class ProductPage extends BasePage {
  constructor(protected page: Page) {
    super(page)
  }

  //validate title of product

  public async validatePageTitle(title: string) {}

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
