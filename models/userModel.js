var mongoose = require("mongoose")
var bcrypt   = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var userSchema = Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    friends: [Schema.Types.ObjectId],
    friendRequests: [Schema.Types.ObjectId],
    configs: [Schema.Types.Mixed],
    groups: [Schema.Types.ObjectId],
    purchases: [Schema.Types.ObjectId],
    paymentsDone: [[Schema.Types.Mixed]],
    paymentsReceived: [[Schema.Types.Mixed]]
})

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
