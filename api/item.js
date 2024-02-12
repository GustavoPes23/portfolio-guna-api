const express = require('express');
const multer = require("multer");
const itemMulterConfig = require("./config/itemMulterConfig")
const routes = express.Router();

const ItemService = require('./services/item');

routes.post('/', multer(itemMulterConfig).single("file"), ItemService.doPost)
    .get('/:id', ItemService.doGetById)
    .get('/all', ItemService.doGetAll);

module.exports = routes;