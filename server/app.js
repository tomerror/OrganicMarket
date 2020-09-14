const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const utils = require('./public/modules/jsonUtils');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/img', require('./routes/pictures'));
app.use('/data', require('./routes/data'));
app.use('/payment', require('./routes/payments'));
app.use('/auth', require('./routes/authentication').router);
app.use('/manage', require('./routes/manage'));
utils.loadDB();

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))