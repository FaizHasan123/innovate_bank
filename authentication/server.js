'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({silent: true, path: `${__dirname}/.env`});

var certFileBuf = fs.readFileSync('797cf5ae-4027-11e9-a020-42025ffb08c8');

var server = require('./app');
var port = 3200;

console.log(`Running on ${process.env.BASE_PATH}:${port}, connecting to ${process.env.MONGO_URL}`)

mongoose.connect(process.env.MONGO_URL, {ssl : true, sslCA : certFileBuf}, function (ignore, connection) {
    connection.onOpen();
    server.listen(port, function () {
        console.log('Server running on port: %d', port);
    });
});

