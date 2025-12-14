import Post from "../../src/components/Post/Post";

describe("Post Component", () => {
  const mockPost = {
    id: 1,
    username: "Марія",
    userId: 1,
    content: "Тестовий пост",
    createdAt: "2024-01-16T10:00:00Z",
    likes: 5,
    comments: [],
    image: null
  };

  const mockUser = { id: 1, username: "Марія" };

  it("calls onLike when Like button clicked", () => {
    const likeSpy = cy.spy().as("likeSpy");

    cy.mount(
      <Post
        post={mockPost}
        currentUser={mockUser}
        onLike={likeSpy}
        onAddComment={() => {}}
      />
    );

    cy.contains("Подобається").click();
    cy.get("@likeSpy").should("have.been.calledOnce");
  });

  it("opens comment form when 'Коментувати' clicked", () => {
    cy.mount(
      <Post
        post={mockPost}
        currentUser={mockUser}
        onLike={() => {}}
        onAddComment={() => {}}
      />
    );

    cy.contains("Коментувати").click();
    cy.get("input[placeholder='Напишіть коментар...']").should("exist");
  });
});
