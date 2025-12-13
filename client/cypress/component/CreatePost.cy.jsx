import CreatePost from "../../src/components/Post/CreatePost/CreatePost";

describe("CreatePost Component", () => {
  const mockUser = { id: 1, username: "Марія" };

  it("opens form when 'Створити пост' clicked", () => {
    cy.mount(<CreatePost user={mockUser} onCreatePost={() => {}} />);

    cy.contains("Створити пост").click();
    cy.contains("Створити новий пост").should("exist");
  });

  it("calls onCreatePost when submitting form", () => {
    const createSpy = cy.spy().as("createSpy");

    cy.mount(<CreatePost user={mockUser} onCreatePost={createSpy} />);

    cy.contains("Створити пост").click();
    cy.get("textarea").type("Мій новий пост");
    cy.contains("Опублікувати").click();

    cy.get("@createSpy").should("have.been.calledOnce");
  });
});
