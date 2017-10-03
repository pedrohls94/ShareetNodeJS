var mongoOp = require("../models/userModel")

module.exports.save = function(name, username, email, password) {
    var db = new mongoOp();
    db.name = name;
    db.username = username;
    db.email = email;
    db.password = db.generateHash(password);
    db.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("User created successfully");
        }
    });
}

module.exports.find = function(userId, callback) {
    mongoOp.findOne({'_id':userId}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            callback(user);
        }
    });
}

module.exports.findByUsername = function(username, callback) {
    mongoOp.findOne({'username':username}, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            callback(user);
        }
    });
}

module.exports.saveFriendRequest = function(user, requesterId) {
    user.friendRequests.push(requesterId);
    user.save(function (err) {
        if (err) console.log(err);
    });
}

module.exports.deleteFriendRequest = function(user, requesterId) {
    user.friendRequests.pop(requesterId);
    user.save(function (err) {
        if (err) console.log(err);
    });
}

module.exports.saveFriend = function(user, userId) {
    user.friends.push(userId);
    user.save(function (err) {
        if (err) console.log(err);
    });
}

module.exports.deleteFriend = function(user, userId) {
    user.friends.pop(userId);
    user.save(function (err) {
        if (err) console.log(err);
    });
}
