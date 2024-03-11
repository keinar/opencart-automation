type locators = {
  searchCriteriaField: string
  categorySearchDropdown: string
  searchByDescriptionCheckbox: string
  searchBySubcategoryCheckbox: string
  searchButtonSubmit: string
}

export const locators: locators = {
  searchCriteriaField: '[id="input-search"]',
  categorySearchDropdown: '[id="input-category"]',
  searchByDescriptionCheckbox: '[name="description"]',
  searchBySubcategoryCheckbox: '[name="subcategories"]',
  searchButtonSubmit: '[id="button-search"]',
}
