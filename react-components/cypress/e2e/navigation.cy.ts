/// <reference types="cypress" />

describe('Navigation on App', () => {
  it('checks Home-About-Form pages', () => {
    cy.visit('/');

    cy.get('.header').contains('About').click();

    cy.url().should('include', '/about');
    cy.get('.main').contains('This is the ABOUT page');

    cy.get('.header').contains('Form').click();
    cy.url().should('include', '/forms');
    cy.get('.container_form-block').contains('Form for creating and adding a product');

    cy.get('.header').contains('Home').click();
    cy.url().should('include', '/');
    cy.get('[data-testid="homepage-h1"]').contains('Library Rick and Morty');
  });

  it('checks Erros page', () => {
    cy.visit('/dssdfgvsdg');

    cy.get('[data-testid="404page-h1"]').should('exist');

    cy.get('.header').contains('Home').click();
    cy.get('[data-testid="homepage-h1"]').contains('Library Rick and Morty');
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});
