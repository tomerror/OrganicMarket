const express = require('express');
const router = express.Router();
const redisUtils = require('../public/modules/redisUtils');
const utils = require('../public/modules/organicUtils');
const moment = require('moment');
const Logger = require('../logger');
const config = require('../config.json');

router.post('/setPayment', async (req, res) => {
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)

        let cart = req.body.cart
        let username = req.body.username
        let time = moment().format(config.paymentDateFormat)
        let refund = 0;
        let itemsInCart = cart.count;

        for (let item of cart.items) {
            let returnCount = await redisUtils.setCartProducts(`cart:${username}:${time}`, item)
            itemsInCart -= returnCount;
            item.count -= returnCount
            refund += returnCount * (item.price * item.weight)
            redisUtils.supplyDecStack(item.display, item.count)
            //redisUtils.setProductDetails(`cart:${username}:${time}`, item)
        }        
        Logger.write(req, config.userNewOrderLog)

        cart.amount -= refund;
        cart.count = itemsInCart;
        redisUtils.setCartDetails(`cart:${username}:${time}`,cart, time)
        
        res.send(200)
    }
    catch (err) {
        res.status(401).send(err)
    }
})

router.post('/getPayments', async (req, res) => {    
    try {
        await redisUtils.checkAuthentication(req.body.username, req.body.password)

        let payments = await redisUtils.getPayments(req.body.username);
        
        debugger;
        payments.sort(utils.sortByPaymentDate);
        Logger.write(req, config.paymentLog)
        res.send(payments)
    }
    catch (err) {
        res.status(401).send(err)
    }
})

module.exports = router