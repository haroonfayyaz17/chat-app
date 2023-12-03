const db = require('../models');
const omit = require('lodash/omit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {api} = require('../utils/common');
const {ENV} = require('../utils/constants');

module.exports.login = (req, res) =>
  api(res, async () => {
    const {email, password} = req.body;
    const user = await db.User.findOne({email}, 'username email password').lean();
    if (!user) return res.status(404).send({success: false, message: 'User not found!'});

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(404).send({success: false, message: 'Password doesn\'t match!'});
    }

    const token = jwt.sign({user_id: user._id, email}, ENV.JWT_SECRET, {expiresIn: '7d'});
    return res.send({success: true, user: omit(user, 'password'), token});
  });
