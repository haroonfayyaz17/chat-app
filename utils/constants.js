require('dotenv/config');
module.exports = {
  ENV: process.env,
  USER_STATUSES: {online: 'online', offline: 'offline'},
  MESSAGE_TYPES: {individual: 'individual', group: 'group'},
};
