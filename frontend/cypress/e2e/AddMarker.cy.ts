import { markerDescription, markerTitle, markerXPosition, markerYPosition, password, username } from "../constants/defaultTestValues"

beforeEach(() => {
  cy.visit('/')
  cy.get('[data-testid="email"] > .MuiInputBase-input').type(username)
  cy.get('[data-testid="password"] > .MuiInputBase-input').type(password)

  cy.get('.MuiButton-root').click()
})

describe('template spec', () => {
  it('passes', () => {
    //Adicionar marcador 1
    //Abre interface de adicionar marcador
    cy.get('.css-1rdbhjv-MuiButtonBase-root-MuiIconButton-root').click()

    //Preenche campos
    cy.get('#titulo').type(markerTitle)
    cy.get(':nth-child(1) > .btn').click()
    cy.get('#descricao').type(markerDescription)

    //Define localização no mapa
    cy.get('.pageMap-form__botoes > [type="button"]').click()
    cy.get('#pageMap-map').click(markerXPosition, markerYPosition)

    //Salvar marcador
    cy.get('[style="background-color: rgb(73, 176, 71);"]').click()
    
    //Confirmar sucesso
    cy.get('[data-testid="SuccessOutlinedIcon"]').should('exist')
    cy.get('[data-testid="CloseIcon"]').click()

    //---------------------------------------------------------------------------------
    //Adicionar marcador 2
    //Abre interface de adicionar marcador
    cy.get('.css-1rdbhjv-MuiButtonBase-root-MuiIconButton-root').click()

    //Preenche campos
    cy.get('#titulo').type(markerTitle)
    cy.get(':nth-child(1) > .btn').click()
    cy.get('#descricao').type(markerDescription)

    //Define localização no mapa
    cy.get('.pageMap-form__botoes > [type="button"]').click()
    cy.get('#pageMap-map').click(markerXPosition + 100, markerYPosition)

    //Salvar marcador
    cy.get('[style="background-color: rgb(73, 176, 71);"]').click()
    
    //Confirmar sucesso
    cy.get('[data-testid="SuccessOutlinedIcon"]').should('exist')
    cy.get('[data-testid="CloseIcon"]').click()

    //---------------------------------------------------------------------------------
    //Adicionar marcador 3
    //Abre interface de adicionar marcador
    cy.get('.css-1rdbhjv-MuiButtonBase-root-MuiIconButton-root').click()

    //Preenche campos
    cy.get('#titulo').type(markerTitle)
    cy.get(':nth-child(2) > .btn').click()
    cy.get('#descricao').type(markerDescription)

    //Define localização no mapa
    cy.get('.pageMap-form__botoes > [type="button"]').click()
    cy.get('#pageMap-map').click(markerXPosition + 200, markerYPosition)

    //Salvar marcador
    cy.get('[style="background-color: rgb(73, 176, 71);"]').click()
    
    //Confirmar sucesso
    cy.get('[data-testid="SuccessOutlinedIcon"]').should('exist')
    cy.get('[data-testid="CloseIcon"]').click()
  })
})