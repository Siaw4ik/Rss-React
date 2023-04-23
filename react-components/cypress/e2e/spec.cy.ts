/// <reference types="cypress" />

describe('Just visit e2e test', () => {
  it('checks About link works', () => {
    cy.visit('/');

    cy.get('.header').contains('About').click();

    cy.url().should('include', '/about');
    cy.get('.main').contains('This is the ABOUT page');
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
})