const bcrypt = require("bcrypt");
const db = require("../models");
const { api } = require("../utils/common");

module.exports.getAll = (req, res) =>
    api(res, async () => {
        const users = await db.User.find(req.query);
        return res.json(users);
    });

module.exports.create = (req, res) =>
    api(res, async () => {
        const user = await db.User.create(req.body);
        // const { email } = req.body;
        // const user = await db.User.findOneAndUpdate({ email }, req.body);
        return res.json(user);
    });

module.exports.login = (req, res) =>
    api(res, async () => {
        const { email, password } = req.body;
        const user = await db.User.findOne({ email });
        if (!user) return res.status(404).send({ success: false, message: "User not found!" });

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(404).send({ success: false, message: "Password doesn't match!" });
        }

        return res.send({ success: true, user });
    });
