var mongoOp = require("../models/userModel")

var save = function(name, username, email, password) {
    var db = new mongoOp()

    db.name = name
    db.username = username
    db.email = email
    db.password = db.generateHash(password);

    db.save(function(err) {
        if (err) console.log(err)
        else console.log("User created successfully")
    })
}

module.exports.save = save

var authenticate = function(username, password, callback) {
    mongoOp.findOne({'username':username}, function(err, user) {
        if (user.validPassword(password)) {
            callback(user);
        } else {
            //TODO: something
        }
    });
}

module.exports.authenticate = authenticate
