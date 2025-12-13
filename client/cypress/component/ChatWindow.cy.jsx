import ChatWindow from "../../src/components/ChatWindow/ChatWindow";

describe("ChatWindow Component", () => {
  it("renders placeholder when no chat selected", () => {
    cy.mount(<ChatWindow activeChatId={null} chatsData={[]} />);
    cy.contains("Оберіть чат").should("exist");
  });

  it("renders active chat name", () => {
    const chats = [
      { id: 1, chatName: "Тестовий чат", lastMessage: "" }
    ];

    cy.mount(<ChatWindow activeChatId={1} chatsData={chats} />);
    cy.contains("Тестовий чат").should("exist");
  });
});
