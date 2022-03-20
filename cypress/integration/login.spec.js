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

    context('Login falhando', function () {

        it('Incorrect password', function () {
            let user = {
                name: 'Felipe Meyer',
                email: 'felipe@samuraibs.com',
                password: 'invalid'
            }

            loginPage.go()
            loginPage.typeLoginData(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })

        it('Incorrect email', function () {
            let user = {
                name: 'Felipe Meyer',
                email: 'felipe.samuraibs.com',
                password: 'invalid'
            }

            loginPage.go()
            loginPage.typeLoginData(user)
            loginPage.submit()
            loginPage.alertHaveText('Informe um email válido')
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
})