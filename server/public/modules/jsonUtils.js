const redisWriter = require('./redisWriter');
const redisUtils = require('./redisUtils');
const json = require('../../data.json');

const initGroceries = () => {
    json.shop.forEach((product) => {
        redisWriter.setHash(`shop:${product.display}`, {
            'category': `${product.category}`,
            'name': `${product.name}`,
            'display': `${product.display}`, 
            'image': `${product.image}`,
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