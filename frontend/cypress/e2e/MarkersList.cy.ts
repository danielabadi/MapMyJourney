import { password, username } from "../constants/deafultTestValues"

beforeEach(() => {
  cy.visit('/')
  cy.get('[data-testid="email"] > .MuiInputBase-input').type(username)
  cy.get('[data-testid="password"] > .MuiInputBase-input').type(password)

  cy.get('.MuiButton-root').click()
})

describe('Lista de marcadores', () => {
  it('passes', () => {
    //Abre a lista de marcadores
    cy.get('.MuiAvatar-root').click()
    cy.get('.MuiList-root > [tabindex="-1"]').click()

    //Checar número de elementos na lista
    cy.get('.MuiList-root').find('.MuiListItemIcon-root').should('have.length', 3)

    //Filtrar por status Já Fui
    cy.get('.css-1xhj18k > :nth-child(1) > .MuiButtonBase-root').click()
    cy.get('.MuiFormGroup-root > :nth-child(2)').click()
    cy.get('.MuiFormGroup-root > :nth-child(3)').click()
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click()


    //Checar número de elementos na lista
    cy.get('.MuiList-root').find('.MuiListItemIcon-root').should('have.length', 2)

    //Filtrar por status Quero ir
    cy.get('.css-1xhj18k > :nth-child(1) > .MuiButtonBase-root').click()
    cy.get('.MuiFormGroup-root > :nth-child(1)').click()
    cy.get('.MuiFormGroup-root > :nth-child(2)').click()
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click()


    //Checar número de elementos na lista
    cy.get('.MuiList-root').find('.MuiListItemIcon-root').should('have.length', 0)

    //Filtrar por status Planejad
    cy.get('.css-1xhj18k > :nth-child(1) > .MuiButtonBase-root').click()
    cy.get('.MuiFormGroup-root > :nth-child(2)').click()
    cy.get('.MuiFormGroup-root > :nth-child(3)').click()
    cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click()


    //Checar número de elementos na lista
    cy.get('.MuiList-root').find('.MuiListItemIcon-root').should('have.length', 1)

  })
})