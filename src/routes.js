const express = require('express');
const routes = express.Router();
const uploadMiddleware = require("./config/upload");
const { verifyToken } = require("./config/auth");

const ItemService = require('./services/item');
const AuthService = require("./services/auth");

routes.post('/item', verifyToken, uploadMiddleware, ItemService.doPost)
    .get('/item/:id', verifyToken, ItemService.doGetById)
    .get('/item', verifyToken, ItemService.doGetAll)
    .put('/item/:id',verifyToken, ItemService.doUpdate);

routes.post('/user/insert', AuthService.doPost)
    .post('/user/auth', AuthService.doPostAuth);
    
module.exports = routes;