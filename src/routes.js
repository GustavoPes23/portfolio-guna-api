import express from 'express';
import { Router } from 'express';
import uploadMiddleware from "./config/upload.js";
import { verifyToken } from "./config/auth.js";

import { doPostItems, doGetByIdItems, doGetAllItems, doUpdateItems } from './services/item.js';
import { doPostTag, doGetByCodeTag, doGetAllTag } from './services/tag.js';
import { doPostAuth } from "./services/auth.js";

const routes = Router();

routes.post('/item', verifyToken, uploadMiddleware, doPostItems)
    .get('/item/:id', verifyToken, doGetByIdItems)
    .get('/item', verifyToken, doGetAllItems)
    .put('/item/:id',verifyToken, doUpdateItems);

routes.post('/tag', verifyToken, doPostTag)
    .get('/tag/get-by-code/:code', verifyToken, doGetByCodeTag)
    .get('/tag', verifyToken, doGetAllTag);

routes.post('/user/auth', doPostAuth);
    
export default routes;
