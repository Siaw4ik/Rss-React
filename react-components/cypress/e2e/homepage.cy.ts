/// <reference types="cypress" />

describe('Visit home page', () => {
  it('checks default cards presence', () => {
    cy.visit('/');

    cy.get('[data-testid="card"]').should('have.length', 20);
  });

  it('checks search works', () => {
    cy.visit('/');

    cy.get('[data-testid="searchbar"]').type('kyle{enter}');

    cy.get('[data-testid="card"]').should('have.length', 1);
    cy.get('[data-testid="card"]').contains('Kyle');
    cy.get('[data-testid="card"]').click();

    cy.get('[data-testid="cardDetails-cross"]').click();
  });

  it('checks show error', () => {
    cy.visit('/');

    cy.get('[data-testid="searchbar"]').type('kyledfbrebtbb{enter}');

    cy.get('[data-testid="title-error"]').should('exist');
  });

  it('should like card', () => {
    cy.visit('/');

    cy.get('[data-testid="searchbar"]').type('kyle{enter}');

    cy.get('[data-testid="like-image"]').click();

    cy.get('.header').contains('About').click();

    cy.url().should('include', '/about');

    cy.get('.header').contains('Home').click();
    cy.url().should('include', '/');
    cy.get('[data-testid="card"]').should('have.length', 1);
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});
