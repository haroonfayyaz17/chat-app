const {MESSAGE_TYPES} = require('./constants');

module.exports = {
  getMsgRefModel: (doc) => (doc.type === MESSAGE_TYPES.individual ? 'Users' : 'Groups'),
};
