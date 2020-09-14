const connection = require('./redisConnector');

const getKeys = async (prefix) => {
    return new Promise((resolve, reject) => {
        connection.KEYS(`${prefix}`, function (err, reply) {
            resolve(reply)
        });
    })
}

const getHashField = async (key, field) => {
    return new Promise((resolve, reject) => {
        connection.HMGET(`${key}`, `${field}`, function (err, reply) {
            resolve(reply)
        });
    })
}

const getHashAll = async (key) => {
    return new Promise((resolve, reject) => {
        connection.HGETALL(`${key}`, function (err, reply) {
            resolve(reply)
        });
    })
}

module.exports = { 
    getKeys,
    getHashAll,
    getHashField
}