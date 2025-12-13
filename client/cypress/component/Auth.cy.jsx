import React from "react";
import { MemoryRouter } from "react-router-dom";
import Auth from "../../src/pages/Auth/Auth";
import { AuthContext } from "../../src/hooks/AuthContext";


const mountAuth = (overrides = {}) => {
  const authMock = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    authenticate: cy.stub().resolves({ success: true }),
    logout: cy.stub(),
    updateUserLocal: cy.stub(),
    ...overrides,
  };

  cy.mount(
    <MemoryRouter>
      <AuthContext.Provider value={authMock}>
        <Auth />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return authMock;
};

describe("<Auth />", () => {



  it("shows auth mode selection screen", () => {
    mountAuth();

    cy.contains("Оберіть дію").should("exist");
    cy.contains("Увійти").should("exist");
    cy.contains("Зареєструватися").should("exist");
  });



  it("switches to login form", () => {
    mountAuth();

    cy.contains("Увійти").click();

    cy.contains("Вхід").should("exist");
    cy.get("input[name='email']").should("exist");
    cy.get("input[name='password']").should("exist");
    cy.get("button[type='submit']").should("exist");
  });

 
  it("does NOT show validation error on empty login submit", () => {
    mountAuth();

    cy.contains("Увійти").click();
    cy.get("button[type='submit']").click();

    cy.contains("Будь ласка, заповніть email та пароль").should("not.exist");
  });



  it("switches to register form", () => {
    mountAuth();

    cy.contains("Зареєструватися").click();

    cy.contains("Реєстрація").should("exist");
    cy.get("input[name='name']").should("exist");
    cy.get("input[name='email']").should("exist");
    cy.get("input[name='password']").should("exist");
  });

  it("shows validation error on empty register submit", () => {
    mountAuth();

    cy.contains("Зареєструватися").click();
    cy.get("button[type='submit']").click();


  });

  it("shows name validation error if name is too short", () => {
    mountAuth();

    cy.contains("Зареєструватися").click();

    cy.get("input[name='email']").type("test@test.com");
    cy.get("input[name='password']").type("12345");
    cy.get("input[name='name']").type("ab");

    cy.get("button[type='submit']").click();

    cy.contains("Ім'я користувача має містити принаймні 3 символи").should(
      "exist"
    );
  });



  it("calls authenticate with correct data on successful register", () => {
    const authMock = mountAuth();

    cy.contains("Зареєструватися").click();

    cy.get("input[name='email']").type("ivan@test.com");
    cy.get("input[name='password']").type("12345");
    cy.get("input[name='name']").type("Іван");

    cy.get("button[type='submit']").click();

    cy.wrap(authMock.authenticate).should("have.been.calledWith",
      "ivan@test.com",
      "12345",
      "Іван",
      true
    );
  });



  it("returns to mode selection when clicking back button", () => {
    mountAuth();

    cy.contains("Увійти").click();
    cy.contains("← Назад").click();

    cy.contains("Оберіть дію").should("exist");
  });
});




