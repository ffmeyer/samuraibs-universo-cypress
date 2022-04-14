import dashPage from '../support/pages/dash'

import { customer, provider, appointment } from '../support/factories/dash'


describe('dashboard', function () {

    context('Quando o cliente faz um agendamento no app mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)
            cy.apiLogin(customer)
            cy.log(provider)
            cy.setProviderID(provider.email)
            cy.createAppointment(appointment.hour)
        })

        it('o mesmo deve ser exibido no dashboard', function () {
            const date = Cypress.env('appointmentDate')

            //cy.uiLogin(provider)
            cy.apiLogin(provider, true)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(date)
            dashPage.appointmentShouldBeVisible(customer, appointment.hour)

        })

    })


})
