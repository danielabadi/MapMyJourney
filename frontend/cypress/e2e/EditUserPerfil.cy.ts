import { password, userDescription, username } from "../constants/deafultTestValues"

beforeEach(() => {
  cy.visit('/')
  cy.get('[data-testid="email"] > .MuiInputBase-input').type(username)
  cy.get('[data-testid="password"] > .MuiInputBase-input').type(password)

  cy.get('.MuiButton-root').click()
})

describe('Edit user perfil', () => {
  it('passes', () => {
    //Abre o Formulário de edição do perfil
    cy.get('.MuiAvatar-root').click()
    cy.get('.MuiList-root > [tabindex="0"]').click()

    //Preenche os campos necessários
    cy.get('[data-testid="description"] > [aria-invalid="false"]').clear().type(userDescription)
    cy.get('[data-testid="password"] > .MuiInputBase-input').type(password)

    //Submete alterações
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click()

    //Abre o Formulário de edição do perfil
    cy.get('.MuiAvatar-root').click()
    cy.get('.MuiList-root > [tabindex="0"]').click()

    //Verifica se alterações foram salvas
    cy.get('[data-testid="description"] > [aria-invalid="false"]').should('have.value', userDescription)
    cy.get('[data-testid="password"] > .MuiInputBase-input').should('be.empty')
  })
})