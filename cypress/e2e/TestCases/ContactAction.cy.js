/// <reference types="cypress" />

import ContactPage from "../PageObject/ContactPage";


describe('Verify the contact page functionality', () => {


  let knowAboutUs = "select[id*='how_did_you_hear_about_us_']"
  let data;
  let contactPage;

  beforeEach(() => {
    contactPage = new ContactPage();
    cy.visit('https://www.founderandlightning.com/contact')
    cy.fixture('example').then((fData) =>{
       data=fData;
    })

  })

  it('Verify Contact page is loaded', () => {
    cy.url().should('include','contact')
  })

  it('Verify FirstName, LastName , Email, PhoneNumber,Messages fields are mandatory on contact page', () => {
      cy.contains("Send Message >").click()        
      cy.get('label.hs-error-msg').should('have.length',5)
  })

  it('Verify the error message when invalid email id is passed',() =>{
    cy.EnterData(contactPage.FirstName(),data.name).should('have.value',data.name)
    cy.EnterData(contactPage.LastName(),data.lastname).should('have.value',data.lastname)
    cy.EnterData(contactPage.Email(),data.invalidEmailId).should('have.value',data.invalidEmailId)
    cy.EnterData(contactPage.Message(),data.message).should('have.value',data.message)
    cy.EnterData(contactPage.PhoneNumber(),data.phoneNumber).should('have.value',data.phoneNumber)
    contactPage.HowYouKnowUs().select(data.HOwToKnowUs).should('have.value',data.HOwToKnowUs)
    contactPage.SendMessageButton().click()  
    contactPage.InvalidEmailErrorMessage().should('have.text',"Please change your email address to continue.")
  })

  it("Verify message is send successfully after sending all valid data",()=>{


    cy.EnterData(contactPage.FirstName(),data.name).should('have.value',data.name)
    cy.EnterData(contactPage.LastName(),data.lastname).should('have.value',data.lastname)
    cy.EnterData(contactPage.Email(),data.email).should('have.value',data.email)
    cy.EnterData(contactPage.Message(),data.message).should('have.value',data.message)
    cy.EnterData(contactPage.PhoneNumber(),data.phoneNumber).should('have.value',data.phoneNumber)
    contactPage.HowYouKnowUs().select(data.HOwToKnowUs).should('have.value',data.HOwToKnowUs)
    contactPage.SendMessageButton().click()  
    cy.wait(200)      
    cy.contains("Thank you for your message. We'll get back to you as soon as possible.")
  })

  it('Verify the Privacy link is present on the contat page and it is opening on the same page',()=>{
      // cy.get("iframe[title='reCAPTCHA']").then(function($iframe){
      //   const iframeCOntent =  $iframe.contents().find('Privacy')
      //   cy.wrap(iframeCOntent)
      //   // cy.contains('Privacy').click()
      // })
      cy.contains('Privacy').click()
      // cy.get("a[href*='privacy']").invoke('removeAttr', 'target').click()
      cy.url().should('include','privacy-policy')
      cy.contains('Privacy Policy').should('be.visible')
  })
  it('Verify the Terms link is present on the contat page and it is opening on the same page',()=>{
     cy.get("iframe[title='reCAPTCHA']").then(function($iframe){
        const iframeCOntent =  $iframe.contents().find('Terms')
        cy.wrap(iframeCOntent)
        cy.contains('Terms').click()
      })
    // cy.contains('Terms').click()
    // cy.get("a[href*='privacy']").invoke('removeAttr', 'target').click()
    cy.contains('GOOGLE TERMS OF SERVICE').should('be.visible')
})

it('Verify TOP button is present and it will navigated to top after click',()=>{
  cy.EnterData(contactPage.FirstName(),data.name).should('have.value',data.name)
  cy.contains('Top').should('be.visible')
  cy.wait(500)
  // cy.contains('Top').click().click()
  // cy.get("a[href='#top']").click({ force: true })
  // cy.get("a[href='#top']").trigger("click")

  cy.get("a[href='#top']").trigger('mouseover').click();
  // cy.get("a[href='#top']").invoke('hide')
  cy.get("a[href='#top']").should('be.invisible')
  
})

it('Verify the Our Locations sections is present and it contains 3 location',()=>{
  cy.contains('Our Locations').should('have.visible')
  cy.get('div.fw-bold').should('have.length',3)
  cy.get('div.fw-bold').first().should('contain.text','London')
  cy.get('div.fw-bold').last().should('contain.text','Mohali')
})
it('Verify the Carriers ,Blog,Contact us,Glossary,Smoke Test Guide, Privacy Policy sections present at the footer of the page',()=>{
  
  cy.get('.footer-link').should('have.length',6)
  cy.get('.footer-link').should('contain.text','Careers')
  cy.get('.footer-link').should('contain.text','Blog')
  cy.get('.footer-link').should('contain.text','Contact us')
  cy.get('.footer-link').should('contain.text','Glossary')
  cy.get('.footer-link').should('contain.text','Smoke Test Guide')
  cy.get('.footer-link').should('contain.text','Privacy policy')
})
  
 
})