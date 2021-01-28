/// <reference types="cypress" />

import { urls } from "../support/urls"
import { productPage } from "../support/page-objects/product"
import { cartPage } from "../support/page-objects/cart"
import { products } from "../support/api/wooCommerce/products"

describe('Product shopping actions', () => {
  const productDescription = {
      name: 'TestProduct',
      type: 'simple',
      regular_price: '50.5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor massa quis tortor congue scelerisque.',
      short_description: 'Lorem ipsum dolor sit amet'
  }

  let itemId

  before(() => {
    products.create(productDescription).then((response) => { itemId = response.body.id; });
  })

  beforeEach(() => {
    cy.visit(urls.productUrl + productDescription.name);
  })

  after(() => {
    products.delete(itemId);
  })

  it('should load product information', () => {
    productPage.getName().should('have.text', productDescription.name);
    productPage.getRegularPrice().should('include.text', productDescription.regular_price);
  });

  it('should add a product to the cart', () => {
    let quantity = 7;
    productPage.addProductToCart(quantity);
    productPage.getCartContents().should('include.text', quantity)
  });

  it('should navigate to the cart page', () => {
    let quantity = 3;
    productPage.addProductToCart(quantity);
    cy.visit(urls.cartUrl);
    cartPage.getProductName().should('include.text', productDescription.name);
    cartPage.getProductPrice().should('include.text', productDescription.regular_price);
    cartPage.getProductQuantity().should('include.value', quantity);
  });
});
