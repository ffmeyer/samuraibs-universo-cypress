
import { el } from './elements'

class Header {

    validateUserLoggedIn(expectText) {
        cy.get(el.fullname, { timeout: 7000 })
            .should('be.visible')
            .should('have.text', expectText)
    }
}

export default new Header()