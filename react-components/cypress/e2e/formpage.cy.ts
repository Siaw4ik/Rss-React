/// <reference types="cypress" />

describe('Forms Page', () => {
  it('submit empty forms', () => {
    cy.visit('/forms');

    cy.get('[data-testid="button"]').click();

    cy.get('.error').should('have.length', 8);
  });

  it('fill form and submit', () => {
    cy.visit('/forms');

    cy.get('[data-testid="name-input"]').type('Rick');
    cy.get('[data-testid="species-select"]').select(2);
    cy.get('[data-testid="status-select"]').select(2);
    cy.get('[data-testid="location-input"]').type('Mars');
    cy.get('[data-testid="gender-radio1"]').check();
    cy.get('[data-testid="date-input"]').type('2023-05-12');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/Morty.jpeg');
    cy.get('[data-testid="consent-check"]').check();

    cy.get('[data-testid="button"]').click();

    cy.get('[data-testid="show-modal-button"]').should('exist');

    cy.get('[data-testid="card"]').should('exist');

    cy.get('.header').contains('About').click();
    cy.url().should('include', '/about');

    cy.get('.header').contains('Form').click();
    cy.url().should('include', '/forms');
    cy.get('[data-testid="card"]').should('have.length', 1);
  });

  it(' error fill 2 input form and submit', () => {
    cy.visit('/forms');

    cy.get('[data-testid="name-input"]').type('rick');
    cy.get('[data-testid="date-input"]').type('2020-05-12');

    cy.get('[data-testid="button"]').click();
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});
