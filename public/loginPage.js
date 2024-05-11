'use strict'
const user = new UserForm()
user.loginFormCallback = data => {
    ApiConnector.login(data, (res) => {
        if (res.success) {
            location.reload()
        }
        else user.setLoginErrorMessage(res.error)
    })
}
user.registerFormCallback = data => {
    ApiConnector.register(data, (res) => {
        if (res.success) {
            location.reload()
        }
        else user.setRegisterErrorMessage(res.error)
    })
}
