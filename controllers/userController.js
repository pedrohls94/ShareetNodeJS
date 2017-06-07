var save = function(name, username, email, password) {
    var mongoOp = require("../models/userModel")
    var db = new mongoOp()
    
    db.name = name
    db.username = username
    db.email = email
    db.password = password
    
    db.save(function(err) {
        if (err) console.log(err)
        else console.log("User created successfully")
    })
}

module.exports.save = save