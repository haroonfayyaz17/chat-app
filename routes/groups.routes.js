const router = require("express").Router();
const controller = require("../controllers/GroupsController");
const { bearerAuth } = require("../middleware/auth");

module.exports = app => {
    router.post("/", controller.create)
    router.put("/join", controller.join)
    router.delete("/leave", controller.leave)
    router.delete("/:id", controller.delete)
    app.use("/groups", bearerAuth, router);
};
