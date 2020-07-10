const express = require('express');
const routes = require('../src/routes/index');
const bodyParser = require('body-parser');

const server = express();

server.set('view engine','ejs');
server.set('views','./src/views');

server.use('/',routes);
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

module.exports = server;