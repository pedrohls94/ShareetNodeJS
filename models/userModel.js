var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/shareet_db")

var Schema = mongoose.Schema

var userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

var User = mongoose.model("User", userSchema)

module.exports = User