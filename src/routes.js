const express = require('express');
const multer = require("multer");
const itemMulterConfig = require("./config/itemMulterConfig")
const routes = express.Router();

const ItemService = require('./services/item');

// routes.post('/item', multer(itemMulterConfig).single("file"), ItemService.doPost)
//     .get('/item/:id', ItemService.doGetById)
//     .get('/item', ItemService.doGetAll);

routes
    .get('/item/:id', ItemService.doGetById)
    .get('/item', ItemService.doGetAll);

module.exports = routes;