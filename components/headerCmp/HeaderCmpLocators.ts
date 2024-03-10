type Locators = {
  seachField: string
  searchButton: string
  categoryMenuItems: string
  dropdownMenu: string
  shoppingCartButton: string
  shoopingCartModal: string
}

export const locators: Locators = {
  seachField: '[id="search"] input',
  searchButton: '[class="btn btn-light btn-lg"]',
  categoryMenuItems: '[class="nav navbar-nav"] > li',
  dropdownMenu: '[class="dropdown-menu show"]',
  shoppingCartButton: '[class="btn btn-inverse btn-block dropdown-toggle"]',
  shoopingCartModal: '[class="dropdown-menu dropdown-menu-right show"]',
}
