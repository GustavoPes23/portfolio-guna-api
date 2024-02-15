const express = require('express');
const routes = express.Router();
const uploadMiddleware = require("./config/upload");
const { verifyToken } = require("./config/auth");

const ItemService = require('./services/item');
const TagService = require('./services/tag');
const AuthService = require("./services/auth");

routes.post('/item', verifyToken, uploadMiddleware, ItemService.doPost)
    .get('/item/:id', verifyToken, ItemService.doGetById)
    .get('/item', verifyToken, ItemService.doGetAll)
    .put('/item/:id',verifyToken, ItemService.doUpdate);

routes.post('/tag', verifyToken, TagService.doPost)
    .get('/tag/get-by-code/:code', verifyToken, TagService.doGetByCode)
    .get('/tag', verifyToken, TagService.doGetAll);

routes.post('/user/auth', AuthService.doPostAuth);
    
module.exports = routes;