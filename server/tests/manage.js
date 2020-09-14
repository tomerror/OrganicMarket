const axios = require('axios');
const config = require('../config.json');
const utils = require('./testUtils');

const getShop = (user) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `http://localhost:4000/manage/getPanel`,
            data: user
        }).then(
            (response) => { resolve(response) },
            (error) => { resolve(error) }
        )
    })
}

module.exports = tester = async () => {
    let res = null
    utils.apiMessage("/manage/getPanel")
    utils.titleMessage("1. Only admin users have access to the shop:")
    utils.subtitleMessage("Valid user without permission:")
    res = await getShop({ username: 'tomer', password: 'tomertomer' })
    res.response.data == config.userDontHavePermission ? utils.failedMessage() : utils.successMessage()

    utils.subtitleMessage("Valid admin user:")
    res = await getShop({ username: 'test', password: 'test' })
    res.status == 200 ? utils.successMessage() : utils.failedMessage()


}