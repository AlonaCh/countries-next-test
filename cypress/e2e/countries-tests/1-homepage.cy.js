describe("Countries Homepage - Test renders", () => {
    it("Home is visible", () => {
        cy.visit("http://localhost:5175");
        cy.get("h1").should("contain", "Home");
    });
});