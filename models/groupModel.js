var mongoose = require("mongoose")

var Schema = mongoose.Schema;

var groupSchema = Schema({
    name: { type: String, required: true },
    members: [Schema.Types.ObjectId],
    purchases: [Schema.Types.ObjectId]
})

module.exports = mongoose.model("Group", groupSchema);
