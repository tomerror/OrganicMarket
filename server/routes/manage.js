const express = require('express');
const router = express.Router();
const redisUtils = require('../public/modules/redisUtils');
const utils = require('../public/modules/organicUtils');
const config = require('../config.json');

router.post('/getPanel', async (req, res) => {
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)
        let user = await redisUtils.getUserDetails(req.body.username)
        if (user.admin == config.userAdminValidation) {
            let logs = await redisUtils.getLogs()
            logs.sort(utils.sortByLogDate)
            res.send(logs)
        } else {
            throw config.userDontHavePermission
        }
    }
    catch (err) {
        res.status(401).send(err)
    }
})

router.post('/discount', async (req, res) => {
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)
        let user = await redisUtils.getUserDetails(req.body.username)
        if (user.admin == config.userAdminValidation) {
            await redisUtils.setDiscount(req.body.product)
            res.send(200)
        } else {
            throw config.userDontHavePermission
        }
    }
    catch (err) {
        res.status(401).send(err)
    }
})

router.post('/productVisibility', async (req, res) => {
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)
        let user = await redisUtils.getUserDetails(req.body.username)
        if (user.admin == config.userAdminValidation) {
            await redisUtils.setVisibility(req.body.product)
            res.send(200)
        } else {
            throw config.userDontHavePermission
        }
    }
    catch (err) {
        res.status(401).send(err)
    }
})

router.post('/supplyInc', async (req, res) => {
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)
        let user = await redisUtils.getUserDetails(req.body.username)
        if (user.admin == config.userAdminValidation) {
            await redisUtils.supplyInc(req.body.product)
            res.send(200)
        } else {
            throw config.userDontHavePermission
        }
    }
    catch (err) {
        res.status(401).send(err)
    }
})

router.post('/supplyDec', async (req, res) => {
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)
        let user = await redisUtils.getUserDetails(req.body.username)
        if (user.admin == config.userAdminValidation) {
            await redisUtils.supplyDec(req.body.product)
            res.send(200)
        } else {
            throw config.userDontHavePermission
        }
    }
    catch (err) {
        res.status(401).send(err)
    }
})

module.exports = router