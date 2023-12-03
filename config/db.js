require("dotenv/config");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.DB_URL)
    .then(_ => console.log("Connected Successfully"))
    .catch(() => {
        throw new Error("Unable to connect with DB");
    });
