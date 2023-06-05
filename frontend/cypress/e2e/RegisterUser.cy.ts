import { cookieName, name, password, username } from "../constants/defaultTestValues"

describe('Registro de usuário', () => {
  it('passes', () => {
    cy.visit('/')

    //Ir para página de registro de usuário
    cy.get('.MuiTypography-inherit').click()

    //Preencher campos
    cy.get('[data-testid="name"] > .MuiInputBase-input').type(name)
    cy.get('[data-testid="email"] > .MuiInputBase-input').type(username)
    cy.get('[data-testid="password"] > .MuiInputBase-input').type(password)
    cy.get('[data-testid="confirmPassword"] > .MuiInputBase-input').type(password)

    //Clica no botão de registrar
    cy.get('.MuiButton-root').click()

    //Retorna a tela de login
    cy.contains('Iniciar Sessão')

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