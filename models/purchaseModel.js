var mongoose = require("mongoose")

var Schema = mongoose.Schema;

var purchaseSchema = Schema({
    cost: [Schema.Types.Mixed],
    shareers: [Schema.Types.ObjectId]
})

module.exports = mongoose.model("Purchase", purchaseSchema);
