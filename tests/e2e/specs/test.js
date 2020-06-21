// https://docs.cypress.io/api/introduction/api.html

describe('check header of first page when browsing', () => {
  it('Visits the app root url', () => {
    cy.visit('localhost:8080')
    cy.contains('h3', 'Leer meer over ons')
  });

  it('changes page and view new element', () => {
    cy.get('#klikken123').click()
    cy.contains('h5', 'Openingstijden')
  })

  it('registering test', () =>  {
    cy.visit('localhost:8080');
    cy.get('#registerButton').click();
    cy.get('#exampleInputPassword1').type("test1239243F")
    cy.get('#exampleInputEmail1').type("daisgmso2@hotmail.com")
    cy.get('#loginButtonJo').click();
    cy.contains('h1', 'Dn Hook Admin Paneel')
  })
})
