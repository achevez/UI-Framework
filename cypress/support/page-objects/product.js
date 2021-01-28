import { productSelectors } from "../selectors/product"

export const productPage = {
  /**
   * Function to add a product to the cart.
   * @param {number} quantity - amount of items of the same product to add.
   */
  addProductToCart: (quantity) => {
    cy.get(productSelectors.quantitytxt).clear().type(quantity);
    cy.get(productSelectors.addToCartbtn).click();
  },

  /**
   * Function to retrieve the product name from the Product page.
   */
  getName: () => {
    return cy.get(productSelectors.titlelbl);
  },

  /**
   * Function to retrieve the product regular price from the Product page.
   */
  getRegularPrice: () => {
    return cy.get(productSelectors.pricelbl);
  },

  /**
   * Function to retrieve the cart content value from the Product page.
   */
  getCartContents: () => {
    return cy.get(productSelectors.cartContentslbl);
  },
};
