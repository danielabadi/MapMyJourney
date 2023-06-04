import { markerDescription, markerTitle, markerXPosition, markerYPosition, newMarkerDescription, newMarkerTitle, password, username } from "../constants/defaultTestValues"

beforeEach(() => {
  cy.visit('/')
  cy.get('[data-testid="email"] > .MuiInputBase-input').type(username)
  cy.get('[data-testid="password"] > .MuiInputBase-input').type(password)

  cy.get('.MuiButton-root').click()
})

describe('Edit marker', () => {
  it('passes', () => {
    //Abre interface de detalhes do marcador
    cy.get('#pageMap-map').click(markerXPosition, markerYPosition-1)

    //Validação dos valores
    cy.get('h1').should('contain.text', markerTitle)
    cy.get('.details_marker__description').should('contain.text', markerDescription)

    //Abre interface de editar marcador
    cy.get('.edit_button').click()

    //Verificação de abertura
    cy.get('h1').should('contain.text', 'Editar marcador')

    //Preenchimento dos campos
    cy.get('#titulo').clear().type(newMarkerTitle)
    cy.get('#descricao').clear().type(newMarkerDescription)

    //Salvar alterações
    cy.get('form > button').click()

    //Verificar se alterações foram salvas
    cy.get('h1').should('contain.text', newMarkerTitle)
    cy.get('.details_marker__description').should('contain.text', newMarkerDescription)
  })
})