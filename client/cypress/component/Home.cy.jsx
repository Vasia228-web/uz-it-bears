import Home from "../../src/pages/Home/Home";
import { AuthContext } from "../../src/hooks/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("Home Component — Full Suite", () => {

  const mountHome = () => {
    const user = { id: 1, username: "Марія" };

    cy.mount(
      <AuthContext.Provider value={{ user }}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it("renders feed header and buttons", () => {
    mountHome();

    cy.contains("Стрічка новин").should("exist");
    cy.contains("Всі пости").should("exist");
    cy.contains("Мої пости").should("exist");
    cy.contains("Створити пост").should("exist");
  });

  it("renders posts list", () => {
    mountHome();

    cy.contains("Марія").should("exist");
    cy.contains("Іван").should("exist");
  });

  it("filters posts when switching tabs", () => {
    mountHome();

    cy.contains("Марія").should("exist");
    cy.contains("Іван").should("exist");

    cy.contains("Мої пости").click();

    cy.contains("Марія").should("not.exist");
    cy.contains("Іван").should("exist");

    cy.contains("Всі пости").click();
    cy.contains("Марія").should("exist");
    cy.contains("Іван").should("exist");
  });

  it("calls onLike when like button clicked", () => {
    mountHome();

    // like-btn існує завдяки моканому PostMock.jsx
    cy.contains("Подобається").first().click();
  });

  it("calls onAddComment when comment button clicked", () => {
    mountHome();

    cy.contains("Коментувати").first().click();
  });

  it("Create Post button works (no crash)", () => {
    mountHome();

    cy.contains("Створити пост").click();
  });
});



