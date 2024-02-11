require('dotenv').config({ path: './.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./src/routes');
const app = express();
mongoose.connect(process.env.MONGO_URL)

app.use(cors());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.status(200).json('Welcome, your app is working well');
})

app.listen(process.env.PORT);