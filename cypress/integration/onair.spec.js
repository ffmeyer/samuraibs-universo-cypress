

it ('webapp deve estar online', function(){
    cy.visit('/')
    
    cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')
})




describe('desc1', function () {
    context('context1', function () {
        it('it1', function () {
        })
    })

    context('context2', function () {
        it('it1', function () {
        })
    })
})

describe('desc2', function () {
    context('context1', function () {
        it('it1', function () {
        })
    })

    context('context2', function () {
        it('it1', function () {
        })
    })
})