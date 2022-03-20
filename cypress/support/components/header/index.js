
class Header {
        
    validateUserLoggedIn(expectText){        
        cy.get('header a strong', {timeout: 7000})
            .should('be.visible')
            .should('have.text', expectText)
    }
}

export default new Header()