import Ranking from "../../src/pages/Ranking/Ranking";
import { useRanking } from "../../cypress/support/mocks/useRankingMock";

describe("<Ranking />", () => {

  const mountRanking = () => cy.mount(<Ranking />);

  it("renders all rankings", () => {
    mountRanking();

    cy.contains("Оксана Кодерка").should("exist");
    cy.contains("5100 балів").should("exist");

    cy.contains("Лісові Розробники").should("exist");
    cy.contains("4650 балів").should("exist");

    cy.contains("Марія Гірська").should("exist");
    cy.contains("3200 балів").should("exist");
  });

  it("switches to friends tab", () => {
    mountRanking();

    cy.contains("Друзі (2)").click();

    cy.contains("Оксана Кодерка").should("exist");
    cy.contains("Марія Гірська").should("exist");

    cy.contains("Лісові Розробники").should("not.exist");

    cy.contains("👥 Друг").should("exist");
  });
});
