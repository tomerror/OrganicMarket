const axios = require('axios');
const config = require('../config.json');
const utils = require('./testUtils');

const getDetailsTest = (user) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `http://localhost:4000/auth/getDetails`,
            data: user
        }).then(
            (response) => { resolve(response) },
            (error) => { resolve(error) }
        )
    })
}

const createTest = (user) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `http://localhost:4000/auth/create`,
            data: user
        }).then(
            (response) => { resolve(response) },
            (error) => { resolve(error) }
            )
    })
}

module.exports = tester = async () => {
    let res = null
    utils.apiMessage("/auth/getDetails")
    utils.titleMessage("1. Check if valid user have permission:")
    res = await getDetailsTest({ username: 'test', password: 'test' })
    res.status == 200 ? utils.successMessage() : utils.failedMessage()
    
    utils.titleMessage("2. Check if invalid user have permission:")
    res = await getDetailsTest({ username: 'dsa', password: 'dsadas' })
    res.response.data == config.userDontHavePermission ? utils.failedMessage() : utils.successMessage()

    utils.titleMessage("3. Username cant be empty:")
    utils.subtitleMessage("empty username:")
    res = await getDetailsTest({ username: '', password: 'test' })
    res.response.data == config.usernameErrorMessage ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("Valid username:")
    res = await getDetailsTest({ username: 'ds', password: 'test' })
    res.response.data == config.usernameErrorMessage ? utils.failedMessage() : utils.successMessage()

    utils.titleMessage("4. Password cant be empty:")
    utils.subtitleMessage("empty password:")
    res = await getDetailsTest({ username: 'ds', password: '' })
    res.response.data == config.passwordErrorMessage ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("Valid password:")
    res = await getDetailsTest({ username: 'ds', password: 'test' })
    res.response.data == config.passwordErrorMessage ? utils.failedMessage() : utils.successMessage()


    utils.apiMessage("/auth/create")
    utils.titleMessage("1. Username should contain letters and numbers only")
    utils.subtitleMessage("username empty:")
    res = await createTest({ 
        username: '', 
        password: '',
        firstname: '',
        lastname: '',
        email: '' 
    })
    res.response.data == config.usernameValidation ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("username including special chars:")
    res = await createTest({ 
        username: '$', 
        password: '',
        firstname: '',
        lastname: '',
        email: '' 
    })
    res.response.data == config.usernameValidation ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("valid username:")
    res = await createTest({ 
        username: 'dsa', 
        password: '',
        firstname: '',
        lastname: '',
        email: '' 
    })
    res.response.data == config.usernameValidation ? utils.failedMessage() : utils.successMessage()


    utils.titleMessage("2. Password most be at least 8 letters:")
    utils.subtitleMessage("Password shorter than 8:")
    res = await createTest({ 
        username: 'dsadsa', 
        password: 'd',
        firstname: 'dsasd',
        lastname: 'dsadsa',
        email: '' 
    })
    res.response.data == config.passwordValidation ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("Password longer than 8:")
    res = await createTest({ 
        username: 'dsadsa', 
        password: 'abcdefgh',
        firstname: 'dsasd',
        lastname: 'dsadsa',
        email: '' 
    })
    res.response.data == config.passwordValidation ? utils.failedMessage() : utils.successMessage()
    

    utils.titleMessage("3. Firstname should contain letters only")
    utils.subtitleMessage("firstname empty:")
    res = await createTest({ 
        username: 'dsa', 
        password: '',
        firstname: '',
        lastname: '',
        email: '' 
    })
    res.response.data == config.firstnameValidation ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("firstname include numbers:")
    res = await createTest({ 
        username: 'dsd3a', 
        password: '',
        firstname: '',
        lastname: '',
        email: '' 
    })
    res.response.data == config.firstnameValidation ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("valid firstname:")
    res = await createTest({ 
        username: 'dsa', 
        password: '',
        firstname: 'dsa',
        lastname: '',
        email: '' 
    })
    res.response.data == config.firstnameValidation ? utils.failedMessage() : utils.successMessage()

    utils.titleMessage("4. Lastname should contain letters only")
    utils.subtitleMessage("lastname empty:")
    res = await createTest({ 
        username: 'dsa', 
        password: '',
        firstname: 'dsds',
        lastname: '',
        email: '' 
    })
    res.response.data == config.lastnameValidation ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("lastname include numbers:")
    res = await createTest({ 
        username: 'dsd3a', 
        password: '',
        firstname: 'das',
        lastname: 'ds3',
        email: '' 
    })
    res.response.data == config.lastnameValidation ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("valid lastname:")
    res = await createTest({ 
        username: 'dsa', 
        password: '',
        firstname: 'dsa',
        lastname: 'dsads',
        email: '' 
    })
    res.response.data == config.lastnameValidation ? utils.failedMessage() : utils.successMessage()

    utils.titleMessage("5. Username must to be unique")
    utils.subtitleMessage("username already exists:")
    res = await createTest({ 
        username: 'admin', 
        password: '',
        firstname: 'dsds',
        lastname: '',
        email: '' 
    })
    res.response.data == config.userExists ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("valid username:")
    res = await createTest({ 
        username: 'dsdasdsad9r3-ur39u-93u93-fu-f9if-93iqf-9a', 
        password: '',
        firstname: 'dsa',
        lastname: 'dsads',
        email: '' 
    })
    res.response.data == config.userExists ? utils.failedMessage() : utils.successMessage()

    utils.titleMessage("6. Email must be valid")
    utils.subtitleMessage("invalid email")
    res = await createTest({ 
        username: 'dsddws', 
        password: 'sdsdsdsadsd',
        firstname: 'dsds',
        lastname: 'dsads',
        email: 'dasdsa@fdfpas' 
    })
    res.response.data == config.emailValidation ? utils.failedMessage() : utils.successMessage()
    utils.subtitleMessage("valid email:")
    res = await createTest({ 
        username: 'dsddsdsdwdwds', 
        password: 'ddssdsds',
        firstname: 'dsa',
        lastname: 'dsads',
        email: 'ddas@asf.com' 
    })
    res.status == 200 ? utils.successMessage() : utils.failedMessage()
}