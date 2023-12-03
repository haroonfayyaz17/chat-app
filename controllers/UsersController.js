const db = require('../models');
const {api} = require('../utils/common');

module.exports.getAll = (req, res) =>
  api(res, async () => {
    const users = await db.User.find(req.query)
    // .populate(db.Group._name, "name members")
        .populate({
          path: db.Group._name,
          populate: {path: 'members', model: db.User.modelName, select: 'username email'},
        });
    return res.json(users);
  });

module.exports.create = (req, res) =>
  api(res, async () => {
    const user = await db.User.create(req.body);
    return res.json(user);
  });
