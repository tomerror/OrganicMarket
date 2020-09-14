const redisWriter = require('./redisWriter');
const redisUtils = require('./redisUtils');
const json = require('../../data.json');

const initGroceries = () => {
    json.shop.forEach((product) => {
        redisWriter.setHash(`shop:${product.display}`, {
            'type': `${product.type}`,
            'name': `${product.name}`,
            'display': `${product.display}`, 
            'img': `${product.img}`,
            'price': `${product.price}`,
            'weight': `${product.weight}`,
            'discount': `${product.discount}`,
            'show': `${product.show}`,
            'supply': `${product.supply}`
        })
    });
}

const initAccounts = () => {
    json.accounts.forEach((user) => {
        redisUtils.setAccount(user)
    })
}


const loadDB = () => {
    //require('./redisConnector').flushall();
    initAccounts();
    initGroceries();
}

module.exports = {
    loadDB
}