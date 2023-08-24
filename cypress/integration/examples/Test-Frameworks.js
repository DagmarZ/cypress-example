/// <reference types="Cypress" />
import HomePage from '../../support/pageObjects/HomePage'
import ProductsPage from '../../support/pageObjects/ProductsPage'

describe('Kapitola 9, 10 a 11', function() {
    before(function() {
        cy.fixture('example').then(function(data) {
            this.data = data       // this dává přístup k celé třídě
        })
    })

    it('Frameworks TC',function() {
        const homePage = new HomePage()     // vytvoření objektu třídy HomePage
        const productsPage = new ProductsPage()
        cy.visit(Cypress.env('url') + "/angularpractice")    // vezme url ze souboru cypress.config.js
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value', this.data.name)
        homePage.getEditBox().should('have.attr', 'minlength', '2')
        homePage.getEntrepreneaur().should('be.disabled')

    //    cy.pause()    // pauza testu, pro případ debugování

        homePage.getShopTab().click().debug()     // debug dělá to samé, co pause

    //    cy.selectProduct('Blackberry')
    //    cy.selectProduct('Nokia Edge')

    /*
        array1.forEach(function(element) {
            console.log(element);
        })
    */
    //  this.data.productName - toto je array v example.json

        this.data.productName.forEach(function(element) {
            cy.selectProduct(element)
        });

        productsPage.checkOutButton().click()

        var sum = 0

        cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
            cy.log($el.text())      // v tomto případě získám text: "$. 50000" a "$. 80000", ale chci je sečíst
            // použiju metodu split, abych rozdělila $. a číslo
            const amount = $el.text()
            var res = amount.split(" ")     // chci tu proměnnou res pak přepsat, proto var
        //    res[0] = $.
        //    res[1] = 50000
            res = res[1].trim()     // umaže mezery
            cy.log(res)
            // res i mezisoučet jsou oboje string, musí se přeparsovat na čísla:
            sum = Number(sum) + Number(res)     // při každé iteraci připočítá res k sum, na začátku je sum = 0 (viz nahoře)            
        }).then(function()  // až po tom, co se dokončí celá iterace, vypiš výsledek
        {
            cy.log(sum)
        })

        // srovnání součtu s tím, co se zobrazuje na stránce
        cy.get('h3 > strong').then(function(element)
        {
            const amount = element.text()
            var res = amount.split(" ")
            var total = res[1].trim()     // umaže mezery
            expect(Number(total)).to.equal(sum)
        })

        cy.contains('Checkout').click()
        cy.get('#country').type('India')
        cy.get('.suggestions > ul > li > a').click()
        cy.get('#checkbox2').click({force: true})
        cy.get('input[type="submit"]').click()
    //    cy.get('.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-)')
        cy.get('.alert').then(function(element) 
        {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true
        })

    })


        
})