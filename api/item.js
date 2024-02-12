const express = require('express');
const multer = require("multer");
const itemMulterConfig = require("../src/config/itemMulterConfig")
const routes = express.Router();

const ItemService = require('../src/services/item');

routes.post('/', multer(itemMulterConfig).single("file"), ItemService.doPost)
    .get('/:id', ItemService.doGetById)
    .get('/', ItemService.doGetAll);

module.exports = routes;