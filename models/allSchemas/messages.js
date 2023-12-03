const mongoose = require("mongoose");

const readReceiptSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    timestamp: { type: Date, default: Date.now },
});

const Messages = mongoose.model("Messages", {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: function () {
            // Dynamically reference either User or Group based on the type
            return this.type === "individual" ? "Users" : "Groups";
        },
    },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Groups" },
    content: String,
    type: {
        type: String,
        enum: ["individual", "group"], // Specify the allowed message types
        required: true,
    },
    timestamp: { type: Date, default: Date.now },
    readReceipts: readReceiptSchema,
});

module.exports = Messages;
