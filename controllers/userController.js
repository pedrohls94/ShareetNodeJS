var mongoOp = require("../models/userModel")

module.exports.save = function(name, username, email, password) {
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

module.exports.authenticate = function(username, password, callback) {
    mongoOp.findOne({'username':username}, function(err, user) {
        if (user.validPassword(password)) {
            callback(user);
        } else {
            //TODO: something
        }
    });
}

module.exports.find = function(userId, callback) {
    mongoOp.findOne({'_id':userId}, function(err, user) {
        //TODO: error handling
        callback(user);
    });
}

module.exports.requestFriendship = function(userId, friendId) {
    mongoOp.findOne({'_id':friendId}, function(err, user) {
        //TODO: error handling
        user.friendRequests.push(userId);
        user.save(function (err) {
            if (err) console.log(err);
        });
    });
}

module.exports.acceptFriend = function(userId, friendId) {
    mongoOp.findOne({'_id':userId}, function(err, user) {
        //TODO: error handling
        user.friendRequests.pop(friendId);
        user.friends.push(friendId);
        user.save(function (err) {
            if (err) console.log(err);
        });
    });
    mongoOp.findOne({'_id':friendId}, function(err, user) {
        //TODO: error handling
        user.friends.push(userId);
        user.save(function (err) {
            if (err) console.log(err);
        });
    });

}
