describe('Dashboard Page Test Case', () => {
    it("Do login with correct values", () => {
        cy.visit('http://localhost:3000') // visit login page
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
    it("Found No post for the First Time", () => {
        cy.contains("Found 0 photos");
    });
    it("Contains image url, description input and Publish button", () => {
    // check image
      const image = cy.get("input[name='image']");
      image.should("be.visible");
      image.should("have.attr", "type", "url");
      image.should("have.attr", "required", "required");
      image.should("have.attr", "placeholder", "Image URL");

      // check description
      const description = cy.get("input[name='desc']");
      description.should("be.visible");
      description.should("have.attr", "type", "text");
      description.should("have.attr", "required", "required");
      description.should("have.attr", "placeholder", "What's on your mind?");

      // check login button
      const button = cy.get("button");
      button.should("be.visible");
      button.contains("Publish");
      button.should("have.css", "background-color", "rgb(79, 70, 229)");
      button.should("have.css", "color", "rgb(255, 255, 255)");
    });
    it("Upload same photos", () => {
      //membuat variable photos yang berisi array terdiri dari image dan description
        const photos = [
          {
            imageValue :
            "https://unsplash.com/photos/d9jiWu7Q90Q",
            descriptionValue :
            "Image 1 : Gambar oke 1"
          },
          {
            imageValue :
            "https://unsplash.com/photos/d9jiWu7Q90Q",
            descriptionValue :
            "Image 2: Gambar Oke 2"
          },
        ];

      //looping to input image and description
      photos.forEach(({ imageValue, descriptionValue }) => {
        const image = cy.get("input[name='image']");
        image.type(imageValue);

        const description = cy.get("input[name='desc']");
        description.type(descriptionValue);

        const button = cy.get("button");
        button.click();

        //check upload image is exist
        cy.get("img").should("have.attr", "src", imageValue);
        cy.contains(descriptionValue);
      });

      //ensure found photos amount text
      cy.contains( `Found ${photos.length} photos` );
    });
});