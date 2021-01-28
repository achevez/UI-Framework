import { cartSelectors } from "../selectors/cart"
import { urls } from "../urls"


export const cartPage = {
  /**
   * Function to retrieve a product name from the cart page.
   */
  getProductName: () => {
    return cy.get(cartSelectors.productName);
  },

  /**
   * Function to retrieve a product price from the cart page.
   */
  getProductPrice: () => {
    return cy.get(cartSelectors.productPrice);
  },

  /**
   * Function to retrieve the quantity of items of a product from the cart page.
   */
  getProductQuantity: () => {
    return cy.get(cartSelectors.productQuantity);
  },
};