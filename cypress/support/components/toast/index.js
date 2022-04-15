import { el } from './elements'

class Toast {
    shouldHaveText(expectText) {
        cy.get(el.toast)
            .should('be.visible')
            .should('have.css', 'opacity', '1')
            .find('p')
            .should('have.text', expectText)

        /*
        cy.get(el.toast, { timeout: 8000 })
            .should('be.visible')
            .should('have.css', 'opacity', '1', { timeout: 8000 } )
            .find('p')
            .should('have.text', expectText)
        */

    }
}

export default new Toast()