const axios = require('axios');
const config = require('../config.json');
const utils = require('./testUtils');

const getShop = (user) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `http://localhost:4000/data/shop`,
            data: user
        }).then(
            (response) => { resolve(response) },
            (error) => { resolve(error) }
        )
    })
}

module.exports = tester = async () => {
    let res = null
    utils.apiMessage("/data/shop")
    utils.titleMessage("1. Only valid users have access to the shop:")
    utils.subtitleMessage("Invalid user")
    res = await getShop({ username: 'sdad', password: 'dsds' })
    res.response.data == config.userDontHavePermission ? utils.failedMessage() : utils.successMessage()

    utils.subtitleMessage("Valid user:")
    res = await getShop({ username: 'test', password: 'test' })
    res.status == 200 ? utils.successMessage() : utils.failedMessage()


}