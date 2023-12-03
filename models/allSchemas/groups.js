const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

groupSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    await this.model("Users").updateMany(
        { _id: { $in: this.members } },
        { $pull: { groups: this._id } },
        { multi: true },
        next
    );
});

const Groups = mongoose.model("Groups", groupSchema);

module.exports = Groups;
