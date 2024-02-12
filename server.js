require('dotenv').config({ path: './.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
mongoose.connect(process.env.MONGO_URL);

app.use(cors());

app.use('/', routes);

app.listen(process.env.PORT || 5000);

// Export the Express API
module.exports = app;