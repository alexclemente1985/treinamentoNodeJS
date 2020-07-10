const routes = require('express').Router();
const {index} = require('../controllers/index');
const testeController = require('../controllers/teste/TesteController');
const {cap3Index, cap3FileReader, cap3Domains, cap3AsyncSeries,cap3AsyncParallel} = require('../controllers/cap3/Cap3Controller');

routes.get('/',index);
routes.get('/teste', testeController);
routes.get('/cap3', cap3Index);
routes.get('/cap3/fileReader',cap3FileReader);
routes.get('/cap3/domains',cap3Domains);
routes.get('/cap3/async/series',cap3AsyncSeries);
routes.get('/cap3/async/parallel',cap3AsyncParallel);


module.exports = routes;