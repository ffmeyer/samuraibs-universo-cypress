

import signupPage from '../support/pages/signup'

describe('Cadastro', function () {


    context('quando o usuario é novato', function () {

        const user = {
            name: 'Felipe Meyer',
            email: 'felipe@samuraibs.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
            

            /*cy.wait(1000)
            cy.get('body')*/

            /* mockando a resposta da api, (nao gerando um teste de ponta a ponta)
            cy.intercept('POST','/users', {
                statuscode:  200
            }).as ('postuser')
    
            é necessario a ação de clicar normalmente.
            cy.contains('button','Cadastrar').click()
    
            cypress 'intercepta' o response da api, e passa o mock status code 200
            cy.wait('@postuser')*/
        })
    })

    context('quando o email ja existe', function () {
        const user = {
            name: 'João Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {

            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })

        })

        it('Nao deve cadastrar o usuario', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })

    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'eliza.yahoo.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta]', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            const user = {
                name: 'Jack Friday',
                email: 'jason@gmail.com',
                password: p
            }

            it('nao deve cadastrar com a senha "' + p + '"', function () {
                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

})