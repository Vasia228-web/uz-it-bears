import Chat from "../../src/pages/Chat/Chat";

describe("Chat Component", () => {
  const mountChat = () => cy.mount(<Chat />);

  it("renders chats list", () => {
    mountChat();
    cy.contains("Карпатські Кодерм").should("exist");
    cy.contains("Марія").should("exist");
  });

  it("filters chats through search", () => {
    mountChat();

    cy.get("input[placeholder='Пошук чатів...']").type("Кодерм");

    cy.contains("Карпатські Кодерм").should("exist");
    cy.contains("Марія").should("not.exist");
  });

    it("activates a chat when clicked", () => {
    mountChat();

    cy.contains("Оберіть чат").should("exist");

    cy.contains("Марія").first().click();

    cy.contains("Марія").should("exist");
    });

});


