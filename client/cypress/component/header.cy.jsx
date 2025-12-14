
import Header from "../../src/components/Header/Header";
import { AuthContext } from "../../src/hooks/AuthContext";
import { MemoryRouter } from "react-router-dom";

describe("Header Component", () => {

  const mountHeader = (logoutFn = () => {}) => {
    const dummyAuth = {
      logout: logoutFn,
      isAuthenticated: true,
      user: { name: "Test User" }
    };

    cy.mount(
      <AuthContext.Provider value={dummyAuth}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it("renders UI buttons", () => {
    mountHeader();

    cy.contains("Головна").should("exist");
    cy.contains("Чати").should("exist");
    cy.contains("Проєкт").should("exist");
    cy.contains("Ранг").should("exist");
    cy.contains("Користувач").should("exist");
    cy.contains("Вийти із акаунту").should("exist");
  });

  it("buttons do not crash when clicked (navigation disabled)", () => {
    mountHeader();

    cy.contains("Чати").click();
    cy.contains("Проєкт").click();
    cy.contains("Ранг").click();
    cy.contains("Головна").click();
    cy.get("img[alt='Користувач']").click();
  });

  it("calls logout when logout button is clicked", () => {
    const logoutSpy = cy.stub().as("logoutSpy");
    mountHeader(logoutSpy);

    cy.contains("Вийти із акаунту").click();
    cy.get("@logoutSpy").should("have.been.calledOnce");
  });

});





