var db = require('../models');
var bcrypt = require('bcrypt');

function getWeightHistory(req, res){
    var userIdIn = req.query.userId;
    console.log(userIdIn);
    db.Weight.find({userId:userIdIn},function(err, success){
        if(err){return err}
        if(!success){res.send("This should not happen.")}
        else{
            res.send(success);
        }
    // res.send("YO!")
    })
}

module.exports = {
    getWeightHistory: getWeightHistory
};