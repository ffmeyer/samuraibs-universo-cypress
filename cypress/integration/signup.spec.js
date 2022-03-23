

import signupPage from '../support/pages/signup'

describe('Cadastro', function () {

    before(function (){
        cy.fixture('signup').then(function(signup){
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password

        })
    })


    context('quando o usuario é novato', function () {

        /*const user = {
            name: 'Felipe Meyer',
            email: 'felipe@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }*/

        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {

            signupPage.go()
            signupPage.form(this.success)
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

        before(function () {
            cy.postUser(this.email_dup)
        })

        it('Nao deve cadastrar o usuario', function () {
            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })

    })

    context('quando o email é incorreto', function () {

        it('deve exibir mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {

            it('nao deve cadastrar com a senha "' + p + '"', function () {

                this.short_password.password = p
                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })

    })

    context('quando nao preencho nenhum dos campos', function() {
        const alertMessages = [
        'Nome é obrigatório',
        'E-mail é obrigatório',
        'Senha é obrigatória'
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), function() {
                signupPage.alert.haveText(alert)
            })
        })
    })
})