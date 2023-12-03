const express = require("express");
const bodyParser = require("body-parser");
require("./models");
const port = 3000;

const app = express();
app.use(bodyParser.json());

require("./routes")(app);
app.get("/", (_, res) => res.send({ message: "No resource found" }));

app.listen(port, () => console.log(`Listening on port ${port}`));
