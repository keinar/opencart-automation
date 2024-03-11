import { Locator, Page } from "@playwright/test"
import { BasePage } from "../basePage/BasePage"
import { locators } from "./ProductPageLocators"

export default class ProductPage extends BasePage {
  private compareButton: Locator
  private addToWishListButton: Locator
  private addToCartButton: Locator
  private descriptionTab: Locator
  private specificationTab: Locator
  private reviewsTab: Locator
  constructor(protected page: Page) {
    super(page)
    this.compareButton = page.locator(locators.compareButton)
    this.addToWishListButton = page.locator(locators.addToWishList)
    this.addToCartButton = page.locator(locators.addToCart)
    this.descriptionTab = page.locator(locators.descriptionTab)
    this.specificationTab = page.locator(locators.specificationTab)
    this.reviewsTab = page.locator(locators.reviewsTab)
  }

  public async addToWishList() {
    this.clickElement(this.addToWishListButton)
  }

  public async addToCompare() {
    this.clickElement(this.compareButton)
  }

  public async addToCart() {
    this.clickElement(this.addToCartButton)
  }

  public async productTabsNavigation(tabName: string) {
    switch (tabName) {
      case "Description": {
        this.clickElement(this.descriptionTab)
        break
      }
      case "Specification": {
        this.clickElement(this.specificationTab)
        break
      }
      case "Reviews": {
        this.clickElement(this.reviewsTab)
        break
      }
      default: {
        throw new Error("Invalid tab name")
      }
    }
  }

  public async writeReview(nameField: string, reviewField: string, rating: number) {
    this.fillText(this.page.locator("input[name='name']"), nameField)
    this.fillText(this.page.locator("textarea[name='text']"), reviewField)
    this.clickElement(this.page.locator(`input[value="${rating}"][type="radio"]`))
  }
}
