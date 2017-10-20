var db = require('../models');

//GET request for ALL weight history of current user
function getWeightHistory(req, res){
    var userIdIn = req.query.userId;
    console.log(userIdIn);
    db.Weight.find({userId:userIdIn},function(err, success){
        if(err){return err}
        if(!success){
            res.send("This should not happen since the user should be logged in to reach this function.")
        }
        else{
            res.send(success);
        }
    })
}

module.exports = {
    getWeightHistory: getWeightHistory
};