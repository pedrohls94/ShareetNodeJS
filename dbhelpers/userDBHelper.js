var mongoOp = require("../models/userModel")

module.exports.save = function(req, name, username, email, password, error, success) {
    var db = new mongoOp();
    db.name = name;
    db.username = username;
    db.email = email;
    db.password = db.generateHash(password);
    db.save(function(err) {
        if (err) {
            if(err.code == 11000) error(req.i18n_texts.Error_Username_Unavailable);
            else error(req.i18n_texts.Error_Db);
        }
        else success(req.i18n_texts.Success_User_Registered);
    });
}

module.exports.find = function(userId, callback) {
    mongoOp.findOne({'_id':userId}, function(err, user) {
        if (err) console.log(err);
        else callback(user);
    });
}

module.exports.findByUsername = function(username, callback) {
    mongoOp.findOne({'username':username}, function(err, user) {
        if (err) console.log(err);
        else callback(user);
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
