const app = require("../index");
const routes = require('../src/routes');

app.use("/api/", routes);

app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });

module.exports = app;