const utils = require('./public/modules/redisUtils');
const moment = require('moment');

write = (req, message) => {
    if (!req.path.includes('img')) {
        if (req.body.username != undefined) {
            let log = {
                username: req.body.username,
                time: moment().format("YYYY/MM/DD HH:mm:ss"),
                method: req.method,
                path: req.path,
                message: message
            }
            utils.setLog(log)
            console.log(`${moment().format("YYYY/MM/DD HH:mm:ss")}\t${req.body.username}\t${req.method}\t${req.path}`)
        } else {
            console.log('Username: ' + req.body.username + ' New request to: ' + req.method + ' ' + req.path)
        }
    }
}


module.exports = { write }