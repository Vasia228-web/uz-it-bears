import React from "react";
import ProfilePage from "../../src/pages/ProfilePage/ProfilePage";

describe("<ProfilePage /> (fake API, broken save)", () => {
  const mountProfile = () => cy.mount(<ProfilePage />);

  it("renders profile data from fake backend", () => {
    mountProfile();

    cy.contains("Іван Карпатський").should("exist");
    cy.contains("@ivan_carpathian").should("exist");
    cy.contains("Fullstack розробник з Ужгорода.").should("exist");
    cy.contains("Люблю React, Node.js та гори Карпаt").should("exist");

    cy.contains("234").should("exist");
    cy.contains("187").should("exist");
    cy.contains("19").should("exist");

    cy.contains("Рівень 12").should("exist");
    cy.contains("450 / 700 балів").should("exist");
  });

  it("opens edit mode (without saving)", () => {
    mountProfile();

    cy.contains("Редагувати профіль").click();

    cy.get("input[name='name']").should("exist");
    cy.get("input[name='bio']").should("exist");
    cy.get("input[name='interests']").should("exist");

    cy.contains("Зберегти зміни").should("exist");
  });

  it("has share button", () => {
    mountProfile();
    cy.contains("Поділитись").should("exist");
  });
});

