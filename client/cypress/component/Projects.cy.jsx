import React from "react";
import Projects from "../../src/pages/Project/Project";
import { AuthContext } from "../../src/hooks/AuthContext";


let dummyAuth;

const mountPage = () =>
  cy.mount(
    <AuthContext.Provider value={dummyAuth}>
      <Projects />
    </AuthContext.Provider>
  );

beforeEach(() => {
  dummyAuth = {
    user: { id: 5, username: "Test User" },
    isAuthenticated: true,
    authenticate: cy.stub(),
    logout: cy.stub(),
    updateUserLocal: cy.stub(),
  };
});

describe("Projects Page", () => {

  it("renders project list", () => {
    mountPage();
    cy.contains("AI").should("exist");
    cy.contains("Мобільний додаток").should("exist");
  });

  it("filters projects by search", () => {
    mountPage();
    cy.get("input[placeholder='Пошук проєктів...']").type("AI");
    cy.contains("AI").should("exist");
    cy.contains("Мобільний додаток").should("not.exist");
  });

  it("filters projects by category", () => {
    mountPage();
    cy.get("select").select("Mobile");
    cy.contains("Mobile").should("exist");
    cy.contains("AI Чат-бот для УжНУ").should("not.exist");
  });


  it("opens CreateProject form", () => {
    mountPage();

    cy.contains("➕ Додати проект").click();
    cy.contains("Створити новий проект").should("exist");
    cy.get("input[name='title']").should("exist");
  });

  it("submits new project", () => {
    mountPage();

    cy.contains("➕ Додати проект").click();
    cy.get("input[name='title']").type("Test Project");
    cy.get("textarea[name='description']").type("Description test");
    cy.get("input[name='technologies']").type("React, Node");
    cy.contains("Створити проект").click();

  });

  it("shows no projects when filtered list is empty", () => {
    mountPage();
    cy.get("input[placeholder='Пошук проєктів...']").type("qwerty");
    cy.contains("Проєктів не знайдено").should("exist");
  });
});

