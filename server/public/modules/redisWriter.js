const connection = require('./redisConnector');

const setHash = (key, value) => {
    connection.HMSET(key, value);
}

const setHashField = (key, field, value) => {
    connection.HSET(key, field, value);
}

const deleteHashField = (key, field) => {
    connection.HDEL(key, field);
}
module.exports = { 
    setHash,
    deleteHashField,
    setHashField
}