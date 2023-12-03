const db = require("../models");
const { api } = require("../utils/common");

module.exports.create = (req, res) =>
    api(res, async () => {
        const { name } = req.body;
        if (!name) return res.status(400).json({ success: false, message: "Please provide group name" });

        const group = await db.Group.create(req.body);
        return res.json(group);
    });

module.exports.delete = (req, res) =>
    api(res, async () => {
        const { id } = req.params;

        const group = await db.Group.findOne({ _id: id });
        if (!group) return res.status(404).send({ message: "Group doesn't exist", success: false });

        const res1 = await group.deleteOne();
        // res.json({ message: "Group deleted Successfully", success: true });
        res.json(res1);
    });

module.exports.join = (req, res) =>
    api(res, async () => {
        const { group_id: groupId } = req.body;
        const { user_id: userId } = req.user;

        const user = await db.User.findOne({ _id: userId });
        if (!user) return res.status(404).send({ message: "User doesn't exist", success: false });

        const group = await db.Group.findOne({ _id: groupId }).select('name members');
        if (!group) return res.status(404).send({ message: "Group doesn't exist", success: false });

        user.groups.addToSet(group);
        group.members.addToSet(user);
        await Promise.all([user, group].map(m => m.save()));
        return res.json({ success: true, group });
    });

module.exports.leave = (req, res) =>
    api(res, async () => {
        const { group_id: groupId } = req.body;
        const { user_id: userId } = req.user;

        const user = await db.User.findOne({ _id: userId });
        if (!user) return res.status(404).send({ message: "User doesn't exist", success: false });

        const group = await db.Group.findOne({ _id: groupId });
        if (!group) return res.status(404).send({ message: "Group doesn't exist", success: false });

        user.groups.addToSet(group);
        group.members.addToSet(user);
        await Promise.all([user, group].map(m => m.save()));
        return res.json({ user, group });
    });
