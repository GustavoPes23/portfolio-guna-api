const express = require('express');
const multer = require("multer");
const itemMulterConfig = require("./config/itemMulterConfig")
const routes = express.Router();
const middleware = require("./config/upload");


const ItemService = require('./services/item');

// routes.post('/item', multer(itemMulterConfig).single("file"), ItemService.doPost)
//     .get('/item/:id', ItemService.doGetById)
//     .get('/item', ItemService.doGetAll);

routes.post('/item', middleware, ItemService.doPost)
    .get('/item/:id', ItemService.doGetById)
    .get('/item', ItemService.doGetAll)
    .put('/item/:id', ItemService.doUpdate);

module.exports = routes;