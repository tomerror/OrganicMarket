const redis = require('redis');
const client = redis.createClient();
const config = require('../../config.json');

client.on('connect', function(){
    console.log(config.redisConnectionMessage)
})

module.exports = client