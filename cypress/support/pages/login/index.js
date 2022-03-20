import { el } from './elements'

import toast from '../../components/toast'

class LoginPage {

    constructor() {
        this.toast = toast
    }
    
    go() {
        cy.visit('/')
    }

    typeLoginData(user) {        
        this.typeUser(user)
        this.typePass(user)
    }

    typeUser(user) {    
        if (user.email !== "") {
            cy.get(el.email).type(user.email)       
        }
    }

    typePass(user) {        
        if (user.password !== "") {
            cy.get(el.password).type(user.password)
        }
    }

    submit(){
        cy.contains(el.signIn).click()
    }
    
    alertHaveText(expectText) {
        cy.contains('.alert-error', expectText)
            .should('be.visible')                
    }
}

export default new LoginPage()