describe('Full E2E user flow', () => {
  it('user can login, navigate through pages and logout', () => {


    cy.visit('/auth');


    cy.contains('Уж ІТ Ведмеді').should('be.visible');
    cy.contains('Увійти').should('be.visible');


    cy.contains('Увійти').click();


    cy.get('input[name="email"]').type('fen41k2006@gmail.com');
    cy.get('input[name="password"]').type('pashku228');

    cy.get('button[type="submit"]').click();


    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    cy.contains('Стрічка новин').should('be.visible');
    cy.contains('Створити пост').should('be.visible');


    cy.contains('Чати').click();
    cy.url().should('include', '/chat');
    cy.contains('Повідомлення').should('be.visible');


    cy.contains('Проєкт').click();
    cy.url().should('include', '/projects');
    cy.contains('Проєкти').should('be.visible');


    cy.contains('Ранг').click();
    cy.url().should('include', '/ranking');
    cy.contains('Таблиця рангів').should('be.visible');


    cy.contains('Користувач').click();
    cy.url().should('include', '/profile');
    cy.contains('Прогрес рівня').should('be.visible');


    cy.contains('Вийти із акаунту').click();


    cy.url().should('include', '/auth');
    cy.contains('Увійти').should('be.visible');
  });
});
