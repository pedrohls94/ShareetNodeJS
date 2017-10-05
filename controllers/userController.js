var userDBHelper = require("../dbhelpers/userDBHelper");

module.exports.signup = function(req, res) {
    req.checkBody('name', 'Invalid name').isAlpha();
    req.sanitizeBody('name').escape();
    var errors = req.validationErrors();
    if (errors) {
        req.session.error = errors;
        res.redirect('/');
    } else {
        var errorCallback = function(error) {
            req.session.error = error;
            res.redirect('/');
        };
        var successCallback = function(msg) {
            req.session.success = msg;
            res.redirect('/');
        };
        userDBHelper.save(req.body.name, req.body.username, req.body.email, req.body.psw, errorCallback, successCallback);
    }
}

module.exports.authenticate = function(req, res) {
    userDBHelper.findByUsername(req.body.username, function callback(user){
        if (user.validPassword(req.body.psw)) {
            req.session.user_id = user.id;
            res.redirect('/dashboard');
        } else {
            console.log("Login authentication failed.");
        }
    });
}

module.exports.startSession = function(req, res) {
    userDBHelper.find(req.session.user_id, function callback(user){
        res.render('dashboard.ejs', {
            userName:user.name,
            userId:user.id,
            friends:user.friends,
            test:'<a href="#" class="og-sidebar-item og-red-l3"><i class="fa fa-bell-o"></i> Notifications</a>'
        });
    });
}

module.exports.requestFriendship = function(loggedUserId, requestedFriendId) {
    userDBHelper.find(requestedFriendId, function callback(requestedFriend){
        userDBHelper.saveFriendRequest(requestedFriend, loggedUserId);
    });
}

module.exports.acceptFriend = function(loggedUserId, requesterId) {
    userDBHelper.find(loggedUserId, function callback(loggedUser){
        userDBHelper.deleteFriendRequest(loggedUser, requesterId);
        userDBHelper.saveFriend(loggedUser, requesterId);
    });
    userDBHelper.find(requesterId, function callback(requester){
        userDBHelper.saveFriend(requester, loggedUserId);
    });
}
