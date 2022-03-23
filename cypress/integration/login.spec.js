import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'


describe('Acesso a aplicacao Samuraibs', function () {

    context('Login com sucesso', function () {

        const user = {
            name: 'Felipe Meyer',
            email: 'felipe@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('Deve realizar login', function () {
            loginPage.go()
            loginPage.typeLoginData(user)
            loginPage.submit()
            dashPage.header.validateUserLoggedIn(user.name)
        })
    })

    context('Quando usuario é bom mas a senha esta incorreta', function () {

        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })

        })

        it('Incorrect password', function () {
            loginPage.go()
            loginPage.typeLoginData(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })

        it('User not Found on DB', function () {
            let user = {
                name: 'Felipe Meyer',
                email: 'felipe@msn.com',
                password: 'pwd123'
            }

            loginPage.go()
            loginPage.typeLoginData(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })

        it('Email required', function () {
            let user = {
                name: 'Felipe Meyer',
                email: '',
                password: 'pwd123'
            }

            loginPage.go()
            loginPage.typeLoginData(user)
            loginPage.submit()
            loginPage.alertHaveText('E-mail é obrigatório')
        })

        it('Password required', function () {
            let user = {
                name: 'Felipe Meyer',
                email: 'felipe@samuraibs.com',
                password: ''
            }

            loginPage.go()
            loginPage.typeLoginData(user)
            loginPage.submit()
            loginPage.alertHaveText('Senha é obrigatória')
        })

        it('Email and Pcassword required', function () {
            let user = {
                name: 'Felipe Meyer',
                email: '',
                password: ''
            }

            loginPage.go()
            loginPage.typeLoginData(user)
            loginPage.submit()
            loginPage.alertHaveText('Senha é obrigatória')
            loginPage.alertHaveText('E-mail é obrigatório')
        })
    })

    const emails = [
        'papito.com.br',
        'yahoo.com.br',
        '@gmail.com',
        '@',
        'papito@',
        '111',
        '&*^&^&*',
        'xpto123'

    ]

    before(function () {
        loginPage.go()
    })

    emails.forEach(function (email) {
        context('Quando o formato do email é invalido', function () {
            it('Não deve logar com o email: ' + email, function () {
                let user = { email: email, password: 'pwd123' }
                loginPage.typeLoginData(user)
                loginPage.submit()
                loginPage.alertHaveText('Informe um email válido')
            })
        })
    })

    context.only('quando nao preencho nenhum dos campos', function() {
        const alertMessages = [
        'E-mail é obrigatório',
        'Senha é obrigatória'
        ]

        before(function(){
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir' + alert.toLowerCase(), function() {
                loginPage.alertHaveText(alert)
            })
        })
    })

})
