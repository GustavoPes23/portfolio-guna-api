require('dotenv').config({ path: './.env' });

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
app.use(cors());

app.use('/api', routes);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(process.env.PORT);

module.exports = app;