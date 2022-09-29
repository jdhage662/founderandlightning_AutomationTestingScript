class ContactPage{

    FirstName(){
        return cy.get("input[id*='firstname']");
    }

    LastName(){
        return cy.get("input[id*='lastname']");
    }

    Email(){
        return cy.get("input[id*='email']");
    }

    Message(){
        return cy.get("textarea[id*='message']");
    }

    PhoneNumber(){
        return cy.get("input[id*='mobilephone']");
    }

    HowYouKnowUs(){
        return cy.get("select[id*='how_did_you_hear_about_us_']")
    }

    SendMessageButton(){
        return cy.contains('Send Message >');
    }

    InvalidEmailErrorMessage(){
        return cy.get("label.hs-main-font-element")
    }
}

export default ContactPage