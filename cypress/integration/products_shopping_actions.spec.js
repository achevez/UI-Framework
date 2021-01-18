/// <reference types="cypress" />

import { urls } from "../support/urls"
import { productPage } from "../support/selectors/pages/product"
import { cartPage } from "../support/selectors/pages/cart"
import { products } from "../support/api/wooCommerce/products"

describe('Product shopping actions', () => {
  const productDescription = {
      name: 'TestProduct',
      type: 'simple',
      regular_price: '50.5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor massa quis tortor congue scelerisque.',
      short_description: 'Lorem ipsum dolor sit amet'
  }

  const addProductToCart = (quantity) => {
    cy.get(productPage.quantityinp).clear().type(quantity);
    cy.get(productPage.addToCartbtn).click();
  }
  let itemId

  before(() => {
    products.create(productDescription).then((response) => { itemId = response.body.id; });
  })

  beforeEach(() => {
      cy.visit(`/product/${productDescription.name}/`);
  })

  after(() => {
    products.delete(itemId);
  })

  it('should load product information', () => {
    cy.url().should('include', productDescription.name);
    cy.get(productPage.titlelbl).should('have.text', productDescription.name);
    cy.get(productPage.pricelbl).should('include.text', productDescription.regular_price);
  });

  it('should add a product to the cart', () => {
    let quantity = 7;
    addProductToCart(quantity);
    cy.get(productPage.cartContentslbl).should('include.text', quantity);
  });

  it('should navigate to the cart page', () => {
    let quantity = 3;
    addProductToCart(quantity);
    cy.visit(urls.cartURL);
    cy.url().should('include', urls.cartURL);
    cy.get(cartPage.productName).should('include.text', productDescription.name);
    cy.get(cartPage.productPrice).should('include.text', productDescription.regular_price);
    cy.get(cartPage.productQuantity).should('include.value', quantity);
  });
});
