const router = require("express").Router();
const controller = require("../controllers/GroupsController");

module.exports = app => {
    // router.post("/join_group", controller.joinGroup)
    app.use("/groups", router);
};
