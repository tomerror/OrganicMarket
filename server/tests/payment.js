const axios = require('axios');
const config = require('../config.json');
const utils = require('./testUtils');

const getPayment = (user) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `http://localhost:4000/payment/getPayments`,
            data: user
        }).then(
            (response) => { resolve(response) },
            (error) => { resolve(error) }
        )
    })
}

const setPayment = (user) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `http://localhost:4000/payment/getPayments`,
            data: { 
                username: user.username,
                password: user.password,
                cart:"{amount:40.16,count:12,items:[{category:\"vegetables\",name:\"שעועית ירוקה\",display:\"Green Beans\",count:5,details:{img:\"40\",price:\"24.9\",weight:\"0.2\"}}],delivery:50}"
            }
        }).then(
            (response) => { resolve(response) },
            (error) => { resolve(error) }
        )
    })
}

module.exports = tester = async () => {
    let res = null
    utils.apiMessage("/payment/getPayments")
    utils.titleMessage("1. Only valid users have access to the payment history:")
    utils.subtitleMessage("Invalid user")
    res = await getPayment({ username: 'sdad', password: 'dsds' })
    res.response.data == config.userDontHavePermission ? utils.failedMessage() : utils.successMessage()

    utils.subtitleMessage("Valid user:")
    res = await getPayment({ username: 'test', password: 'test' })
    res.status == 200 ? utils.successMessage() : utils.failedMessage()


    utils.apiMessage("/payment/setPayment")
    utils.titleMessage("1. Only valid users can purchase:")
    utils.subtitleMessage("Invalid user")
    res = await setPayment({ username: 'sdad', password: 'dsds' })
    console.log(res.response.data)
    res.response.data == config.userDontHavePermission ? utils.failedMessage() : utils.successMessage()

    utils.subtitleMessage("Valid user:")
    res = await setPayment({ username: 'test', password: 'test' })
    res.status == 200 ? utils.successMessage() : utils.failedMessage()

}