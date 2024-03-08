import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"
import ApplicationURL from "../helpers/ApplicationURL"

export default class HomePage extends BasePage {
  private featuredProducts: Locator
  constructor(protected page: Page) {
    super(page)
    this.featuredProducts = page.locator('[class="product-thumb"]')
  }

  public async openHomePage() {
    await this.handleVerificationPage()
    await this.validatePageUrl(ApplicationURL.BASE_URL || ApplicationURL.BASE_URL + "index.php?route=common/home&language=en-gb")
  }

  public async addFeaturedProductToCart(productTitle: string) {
    // Find the product with the specified title
    const product = this.featuredProducts.locator("h4 >> text=" + productTitle).first()
    // Navigate to the parent product container
    const productContainer = product.locator('xpath=ancestor::div[contains(@class, "product-thumb")]')
    // Within this product's container, find and click the "Add to Cart" button
    await this.clickElement(productContainer.locator('button >> i[class="fas fa-shopping-cart"]'))
  }

  public async addFeaturedProductToWishList(productTitle: string) {
    // Find the product with the specified title
    const product = this.featuredProducts.locator("h4 >> text=" + productTitle).first()
    // Navigate to the parent product container
    const productContainer = product.locator('xpath=ancestor::div[contains(@class, "product-thumb")]')
    // Within this product's container, find and click the "Add to Wish List" button
    await this.clickElement(productContainer.locator('button >> i[class="fas fa-heart"]'))
  }

  public async addFeaturedProductToCompare(productTitle: string) {
    // Find the product with the specified title
    const product = this.featuredProducts.locator("h4 >> text=" + productTitle).first()
    // Navigate to the parent product container
    const productContainer = product.locator('xpath=ancestor::div[contains(@class, "product-thumb")]')
    // Within this product's container, find and click the "Add to Compare" button
    await this.clickElement(productContainer.locator('button >> i[class="fas fa-exchange-alt"]'))
  }

  public async selectFeaturedProduct(productTitle: string) {
    // Find the product with the specified title
    const product = this.featuredProducts.locator("h4 >> text=" + productTitle).first()
    await this.clickElement(product)
    await expect(this.page.locator("h1")).toContainText(productTitle)
  }
}
