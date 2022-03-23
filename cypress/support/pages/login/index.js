import { el } from './elements'

import toast from '../../components/toast'
import alert from '../../components/alert'

class LoginPage {

    constructor() {
        this.toast = toast
        this.alert = alert
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
            cy.get(el.email)
                .clear()
                .type(user.email)
        }
    }

    typePass(user) {
        if (user.password !== "") {
            cy.get(el.password)
            .clear()
            .type(user.password)
        }
    }

    submit(){
        cy.contains(el.signIn).click()
    }

}

export default new LoginPage()