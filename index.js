require('dotenv').config({ path: './.env' });

// const express = require('express');
// const cors = require('cors');
// const routes = require('./src/routes');

// const app = express();
// app.use(cors());

// // app.get("/", (req, res) => {
// //   res.send("Express on Vercel");
// // });

// app.use(express.json({ extended: false }))

// app.use('/api', routes);

// app.listen(process.env.PORT);

// module.exports = app;

const express = require("express");
const app = express();
const item = require("./api/item");

app.use(express.json({ extended: false }));

app.use("/api/item", item);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));