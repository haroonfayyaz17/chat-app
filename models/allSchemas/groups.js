const mongoose = require("mongoose");
const Groups = mongoose.model("Groups", {
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

module.exports = Groups;
