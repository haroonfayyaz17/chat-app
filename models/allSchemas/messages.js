const mongoose = require('mongoose');
const {MESSAGE_TYPES} = require('../../utils/constants');
const {getMsgRefModel} = require('../../utils/modelHelpers');

const readReceiptSchema = mongoose.Schema(
    {
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
      timestamp: {type: Date, default: Date.now},
    },
    {_id: false},
);

const messageSchena = mongoose.Schema(
    {
      sender: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: function() {
          // Dynamically reference either User or Group based on the type
          return getMsgRefModel(this);
        },
      },
      content: String,
      type: {
        type: String,
        enum: Object.values(MESSAGE_TYPES), // Specify the allowed message types
        required: true,
      },
      timestamp: {type: Date, default: Date.now},
      readReceipts: [readReceiptSchema],
    },
    {discriminatorKey: 'type'},
);

const Messages = mongoose.model('Messages', messageSchena);

module.exports = Messages;
