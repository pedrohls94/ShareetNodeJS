var userDBHelper = require("../dbhelpers/userDBHelper");

module.exports.signup = function(req, res) {
    req.checkBody('name', req.i18n_texts.Error_Form_Name).notEmpty();
    req.checkBody('username', req.i18n_texts.Error_Form_Username).matches("^[a-zA-Z0-9!@#$%&*()-_=+]*$");
    req.checkBody('email', req.i18n_texts.Error_Form_Email).isEmail();
    req.checkBody('password', req.i18n_texts.Error_Form_Password).matches("^[a-zA-Z0-9!@#$%&*()-_=+]*$");
    var errors = req.validationErrors();
    if (errors) {
        errMsg = "";
        for (let i=0; i<errors.length; i++) {
            errMsg += errors[i].msg + " ";
        }
        req.session.error = errMsg;
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
        userDBHelper.save(req, req.body.name, req.body.username, req.body.email, req.body.password, errorCallback, successCallback);
    }
}

module.exports.authenticate = function(req, res) {
    userDBHelper.findByUsername(req.body.username, function callback(user){
        if (user.validPassword(req.body.password)) {
            req.session.user_id = user.id;
            res.redirect('/dashboard');
        } else {
            req.session.error = req.i18n_texts.Error_Login;
            res.redirect('/');
        }
    });
}

module.exports.startSession = function(req, res) {
    userDBHelper.find(req.session.user_id, function callback(user){
        res.render('dashboard.ejs', {
            userName:user.name,
            userId:user.id,
            friends:user.friends
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
