var mongoOp = require("../models/groupModel")

module.exports.save = function(name) {
    var db = new mongoOp();
    db.name = name;
    db.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.i18n_texts.Success_Group_Registered);
        }
    });
}

module.exports.find = function(groupId, callback) {
    mongoOp.findOne({'_id':groupId}, function(err, group) {
        if (err) {
            console.log(err);
        } else {
            callback(group);
        }
    });
}

module.exports.addMember = function(groupId, userId) {
    mongoOp.findOne({'_id':groupId}, function(err, group) {
        if (err) {
            console.log(err);
        } else {
            group.members.push(userId);
            group.save(function (err) {
                if (err) console.log(err);
            });
        }
    });
}
