/// <reference types="cypress" />

describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should have Personal Budget in the h1', () => {
    cy.get('h1').contains('Personal Budget')
  })

  it('should look the same', () => {
    cy.eyesOpen({
      appName: 'My App',
      testName: 'Homepage Check'
    });
    cy.eyesCheckWindow();
    cy.eyesClose();
  })
})