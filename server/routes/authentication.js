const express = require('express');
const router = express.Router();
const redisUtils = require('../public/modules/redisUtils');
const validator = require('validator');
const Logger = require('../logger');
const config = require('../config.json');

router.post('/getDetails', async (req, res) => {
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)
        let user = {};
        user = await redisUtils.getUserDetails(req.body.username)
        Logger.write(req, config.apiGetDetailsLog)
        res.send(user)
    }
    catch (err) {
        console.log(err)
        res.status(401).send(err)
    }
})

router.post('/create', async (req, res) => {
    let user = req.body;
    debugger
    try {
        let exists = await redisUtils.getUserDetails(user.username)
        if (exists != null) { throw config.userExists }
        if (!validator.isAlphanumeric(`${user.username}`)) { throw config.usernameValidation }
        if (!validator.isAlpha(`${user.firstname}`)) { throw config.firstnameValidation }
        if (!validator.isAlpha(`${user.lastname}`)) { throw config.lastnameValidation }
        if (!validator.isLength(`${user.password}`, { min: 8 })) { throw config.passwordValidation }
        if (!validator.isEmail(`${user.email}`)) { throw config.emailValidation }

        redisUtils.setAccount(user)
        Logger.write(req, config.newUserLog)
        res.send(200)

    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = { router }