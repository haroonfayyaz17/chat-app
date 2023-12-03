const db = require('../models');
const {api, parsePagination, parseSorting} = require('../utils/common');
const {MESSAGE_TYPES} = require('../utils/constants');
const {getMsgRefModel} = require('../utils/modelHelpers');

module.exports.getAll = (req, res) =>
  api(res, async () => {
    const {user_id: userId} = req.user;
    const {receiver} = req.query;
    const {offset, limit} = parsePagination(req);
    const opts = {sender: userId};
    if (receiver) opts.receiver = receiver;

    const messages = await db.Message.find(opts)
        .populate('sender', 'email')
        .populate('receiver', 'email name')
        .skip(offset)
        .limit(limit)
        .sort(parseSorting(req));

    res.send({success: true, data: messages});
  });

module.exports.sendMessage = (req, res) =>
  api(res, async () => {
    const {user_id: userId} = req.user;
    const {receiver, msg, isGroup} = req.body;

    const message = await db.Message.create({
      sender: userId,
      receiver,
      content: msg,
      type: isGroup ? MESSAGE_TYPES.group : MESSAGE_TYPES.individual,
      readReceipts: [{user: userId}],
    });

    res.send({success: true, message: 'Message sent successfully!', data: message});
  });

module.exports.markAsRead = (req, res) =>
  api(res, async () => {
    const {user_id: userId} = req.user;
    const message = await db.Message.findOne({_id: req.params.id});
    if (!message) return res.status(404).send({success: false, message: 'Message not found!'});

    const user = await db.User.findOne({_id: userId}).select();
    if (!user) return res.status(404).send({success: false, message: 'User not found!'});

    const updatedMsg = await db.Message.findOneAndUpdate(
        {'_id': message._id, 'readReceipts.user': {$ne: user._id}},
        {$push: {readReceipts: {user: user._id}}},
    );

    res.send({success: true, message: 'Message marked as read!', data: updatedMsg});
  });
