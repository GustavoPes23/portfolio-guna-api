const app = require("../app");
const routes = require('../src/routes');

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

app.use("/api", routes);



module.exports = app;