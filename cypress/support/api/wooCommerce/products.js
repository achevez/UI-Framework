import { endpoints } from "../endpoints.js";

export const products = {
  /**
  Function that creates and returns the id of a created product reponse via API
  @param {productDescription} The description of the product to create
  **/
  create: (productDescription) => {
    return cy.request({
      method: 'POST',
      url: endpoints.products,
      auth: {
        username: Cypress.env('woocommerceUsername'),
        password: Cypress.env('woocommercePassword')
      },
      body: productDescription
    }).then((response) => {
      response.body;
    });
  },

  /**
  Function that deletes a product based on its Id via API
  @param {itemId} Id of the product to delete
  **/
  delete: (itemId) => {
    return cy.request({
      method: 'DELETE',
      url: `${endpoints.products}${itemId}`,
      auth: {
        username: Cypress.env('woocommerceUsername'),
        password: Cypress.env('woocommercePassword')
      }
    })
  },
};
