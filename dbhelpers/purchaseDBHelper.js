var mongoOp = require("../models/purchaseModel")

module.exports.save = function(cost, shareers) {
    var db = new mongoOp();
    db.cost = cost;
    db.shareers = shareers;
    db.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log(req.i18n_texts.Success_Purchase_Registered);
        }
    });
}

module.exports.find = function(purchaseId, callback) {
    mongoOp.findOne({'_id':purchaseId}, function(err, purchase) {
        if (err) {
            console.log(err);
        } else {
            callback(purchase);
        }
    });
}
