"use strict";

require('dotenv').config({ path: './.env' });

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(helmet());
/* app.use(cors(corsOptions)); */

module.exports = app;