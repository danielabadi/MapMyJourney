import { cookieName, password, username } from "../constants/defaultTestValues"

describe('Login', () => {
  it('passes', () => {
    cy.visit('/')

    //Preenche campos de login
    cy.get('[data-testid="email"] > .MuiInputBase-input').type(username)
    cy.get('[data-testid="password"] > .MuiInputBase-input').type(password)

    //Clica no botão de logar
    cy.get('.MuiButton-root').click()

    //Verifica se o usuário foi logado com sucesso e se o cookie foi gerado
    cy.contains('Adicionar marcador')
    cy.getCookie(cookieName).should('exist')
  })
})