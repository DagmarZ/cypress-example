/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'
 
describe('Frames test', function() {
    it('Frames test case',function() {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find("a[href*='mentorship']").eq(0).click()
        cy.wait(8000)
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
 

})
 
 
})