const redisWriter = require('./redisWriter');
const redisReader = require('./redisReader');
const utils = require('./organicUtils');
const config = require('../../config.json');

// Reader
const checkAuthentication = async (username, password) => {
    if (username == '') { throw config.usernameErrorMessage }
    if (password == '') { throw config.passwordErrorMessage }

    let pass = await redisReader.getHashField(config.userKeyCheckAuthentication + `${username}`, config.fieldCheckAuthentication);
    if (pass != password) {
        throw config.userDontHavePermission
    }
}

const getUserDetails = async (username) => {
    let user = await redisReader.getHashAll(config.userKeyCheckAuthentication + `${username}`);
    return user;
}

const getShop = async () => {
    let shop = []
    const keys = await redisReader.getKeys(config.getShopKey);
    for (let product of keys) {
        const result = await redisReader.getHashAll(product);
        shop.push(result);
    }
    return shop
}

const getItem = (username, productKey) => {
    return new Promise(async (resolve, reject) => {
        let details = await redisReader.getHashAll(`${productKey}` + config.getItemSuffix);
        let product = await redisReader.getHashAll(`${productKey}`);

        let tempItem = {
            category: product.category,
            count: product.count,
            display: product.display,
            name: product.name,
            details: {
                img: details.img,
                price: details.price,
                weight: details.weight,
                discount: details.discount
            }
        }
        resolve(tempItem)
    })
}

const getCart = (username, date) => {
    return new Promise(async (resolve, reject) => {
        let details = await redisReader.getHashAll(`cart:${username}:${date}:details`);
        let tempCart = {
            amount: details.amount,
            count: details.count,
            delivery: details.delivery,
            time: details.time,
            items: []
        }
        let keys = await redisReader.getKeys(`cart:${username}:${date}:products:*`);
        let products = utils.groupByDate(keys, 4)
        for (let i = 0; i < products.length; i++) {
            let product = await getItem(username, `cart:${username}:${date}:products:${products[i]}`);
            tempCart.items.push(product);
        }

        resolve(tempCart)
    })
}

const getPayments = async (username) => {
    return new Promise(async (resolve, reject) => {
        let keys = await redisReader.getKeys(config.getCartPrefix + `${username}:*`);
        let dates = utils.groupByDate(keys, 2);
        let payments = []
        for (let i = 0; i < dates.length; i++) {
            let payment = await getCart(username, dates[i]);
            payments.push(payment)
        }
        resolve(payments)
    })
}

const getLog = (keys) => {
    return new Promise(async (resolve, reject) => {
        let logs = []
        for (let i = 0; i < keys.length; i++) {
            let log = await redisReader.getHashAll(keys[i]);
            logs.push(log);
        }
        resolve(logs)
    })
}

const getLogs = async () => {
    let allLog = await redisReader.getKeys(config.getLogKey);
    let logs = await getLog(allLog)
    return logs;
}


// Writer

const setCartDetails = (key, cart, time) => {
    redisWriter.setHash(`${key}:details`, {
        'amount': `${cart.amount}`,
        'count': `${cart.count}`,
        'delivery': `${cart.delivery}`,
        'time': `${time}`
    })
}

const setCartProducts = async (key, item) => {
    let supply = await redisReader.getHashField(`shop:${item.display}`, 'supply')
    let count = item.count <= parseInt(supply[0]) ? item.count : supply[0];
    let refund = item.count - count;

    redisWriter.setHash(`${key}:products:${item.display}`, {
        'category': `${item.category}`,
        'name': `${item.name}`,
        'display': `${item.display}`,
        'count': `${count}`
    })

    return refund;
}

const setProductDetails = (key, item) => {
    redisWriter.setHash(`${key}:products:${item.display}:details`, {
        'img': `${item.details.img}`,
        'price': `${item.details.price}`,
        'weight': `${item.details.weight}`,
        'discount': `${item.details.discount}`
    })
}

const setLog = (log) => {
    redisWriter.setHash(`log:${log.username}:${log.time}`, {
        'username': `${log.username}`,
        'time': `${log.time}`,
        'method': `${log.method}`,
        'path': `${log.path}`,
        'message': `${log.message}`
    })
}

const setAccount = (account) => {
    redisWriter.setHash(`account:${account.username}`, {
        'username': `${account.username}`,
        'password': `${account.password}`,
        'admin': `${account.admin}`,
        'creation_date': `${account.creation_date}`,
        'firstname': `${account.firstname}`,
        'lastname': `${account.lastname}`,
        'email': `${account.email}`,
        'address': `${account.address}`
    })
}

const setDiscount = async (product) => {
    let key = `shop:${product}`
    let field = 'discount'
    let value = (await redisReader.getHashField(key, field))[0] == 1 ? 0 : 1
    redisWriter.deleteHashField(key, field)
    redisWriter.setHashField(key, field, value)
}

const setVisibility = async (product) => {
    let key = `shop:${product}`
    let field = 'show'
    let value = (await redisReader.getHashField(key, field))[0] == "true" ? "false" : "true"
    redisWriter.deleteHashField(key, field)
    redisWriter.setHashField(key, field, value)
}

const supplyIncStack = async (product, rounds) => {
    for(let i=0; i<rounds; i++){
        await supplyInc(product)
    }
}
const supplyInc = async (product) => {
    let key = `shop:${product}`
    let field = 'supply'
    let value = parseInt((await redisReader.getHashField(key, field))[0]) + 1;
    redisWriter.deleteHashField(key, field)
    redisWriter.setHashField(key, field, value)
}

const supplyDecStack = async (product, rounds) => {
    for(let i=0; i<rounds; i++){
        await supplyDec(product)
    }
}

const supplyDec = async (product) => {
    let key = `shop:${product}`
    let field = 'supply'
    let value = parseInt((await redisReader.getHashField(key, field))[0]) - 1;
    if(value >= 0){
        redisWriter.deleteHashField(key, field)
        redisWriter.setHashField(key, field, value)
    } else{
        throw 'The supply is empty'
    }    
}

module.exports = {
    getUserDetails,
    checkAuthentication,
    getShop,
    getItem,
    getCart,
    getPayments,
    getLog,
    getLogs,
    setCartDetails,
    setCartProducts,
    setProductDetails,
    setAccount,
    setLog,
    setDiscount,
    setVisibility,
    supplyInc,
    supplyDec,
    supplyDecStack
}