const express = require('express');
const router = express.Router();
const redisUtils = require('../public/modules/redisUtils');
const Logger = require('../logger');
const config = require('../config.json');

router.post('/shop', async (req, res) => {
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)
        let shop = await redisUtils.getShop();
        Logger.write(req, config.userLoginLog)
        res.send(shop);
    }
    catch (err) {
        res.status(401).send(err)
    }
})

module.exports = router