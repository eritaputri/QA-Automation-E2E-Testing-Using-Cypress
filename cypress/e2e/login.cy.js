describe('Login Page Test Case', () => {
    it('Visit Login Page', () => {
      cy.visit('http://localhost:3000') // visit login page
      cy.title().should("eq","React Gallery"); //find title in the page
      cy.contains("Hello Again") // find the element containing  hello again text
    });
    it("Contains Email and Password input, and Login button", () => {
      // check email
      const email = cy.get("input[name='email']");
      email.should("be.visible"); //to display email
      email.should("have.attr", "type", "email"); //to ensure email component has attribute email type 
      email.should("have.attr", "placeholder", "Email Address"); //to ensure email component has attribute email placeholder with email address text
  
      // check password
      const password = cy.get("input[name='password']");
      password.should("be.visible");
      password.should("have.attr", "type", "password");
      password.should("have.attr", "placeholder", "Password");
  
      // check login button
      const button = cy.get("button");
      button.should("be.visible");
      button.contains("Login");
      button.should("have.css", "background-color", "rgb(79, 70, 229)");
      button.should("have.css", "color", "rgb(255, 255, 255)");

    });
    it("Do login with null value", () => {
      const button = cy.get("button");
      button.click();
      cy.on("windows:alert", (text)=>{
        expect(text).to.contains("login failed"); //to display windows alert with login failed text
      });
    });
    it("Do login with wrong values", () => {
      const email = cy.get("input[name='email']");
      email.type("wrong@react.test") //input wrong email

      const password = cy.get("input[name='password']");
      password.type("password") //input wrong password

      const button = cy.get("button");
      button.click();
      cy.on("windows:alert", (text)=>{
        expect(text).to.contains("login failed"); //to display windows alert with login failed text
      });
    });
    it("Do login with correct values", () => {
      const email = cy.get("input[name='email']");
      email.type("user@react.test") //input  email

      const password = cy.get("input[name='password']");
      password.type("password") //input wrong password

      const button = cy.get("button");
      button.click();
      cy.on("windows:alert", (text)=>{
        expect(text).to.contains("welcome"); //to display windows alert with welcome text
      });
      cy.url().should('eq', 'http://localhost:3000/dashboard') //direct to dashboard page
    });
  });