const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {USER_STATUSES} = require('../../utils/constants');

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'Username already exists!'],
    required: [true, 'Please provide username'],
  },
  name: String,
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Please provide email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  status: {
    type: String,
    enum: Object.values(USER_STATUSES),
    default: USER_STATUSES.offline,
  },
  bio: String,
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Groups',
    },
  ],
});

usersSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  next();
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
