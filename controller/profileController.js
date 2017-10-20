var db = require('../models');
var bcrypt = require('bcrypt');

function updateFitnessGoal(req, res){
  console.log("req.body: ", req.body)
    db.Profile.updateOne({userId:req.body.userId},{fitnessGoal:req.body.fitnessGoal}, function(err,success){
      if(err){return err};
      if(!success){console.log("user not found")}
      console.log("changed goal: ", success);
      db.Profile.findOne({userId:req.body.userId},function(err,success){
        if(err){return err};
        if(!success){console.log("this shouldn't happen")}
        else{
          res.json(success);
        }
      })
    })
}

function updateWeight(req, res){
  console.log("req.body: ", req.body)
    db.Profile.updateOne({userId:req.body.userId},{weight:req.body.weight}, function(err,success){
      if(err){return err};
      if(!success){console.log("user not found")}
      console.log("changed weight: ", success);
      db.Profile.findOne({userId:req.body.userId},function(err,success){
        if(err){return err};
        if(!success){console.log("this shouldn't happen")}
        else{
          var timeIn = decodeURI(req.body.time);
                var newWeight = new db.Weight({
                    userId: req.body.userId,
                    time: timeIn,
                    weight: req.body.weight
                })
                // console.log(newProfile);
                newWeight.save(function(err, success) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("newWeight: ", newWeight);
                })
          res.json(success);
        }
      })
    })
}

function cookieLogIn(req, res){
    db.Profile.findOne({
        userId: req.query.userId
    }, function(err, success) {
        if (err) {return res.send(err)}
        if(!success){
          res.send("cookie fail");
        }else{
          console.log("cookie success");
          res.json(success);
      }
    })
}


function logIn(req, res) {
    // console.log(req.query)
    var passwordIn = req.query.pwd;

    console.log("got login request pwd: ", passwordIn);
    db.Profile.findOne({
        userId: req.query.userId
    }, function(err, success) {
        if (err) {
            return res.send(err)
        }
        if(!success){
          res.send("login error");
        }else{
        console.log("success.token: ", success.token)
        bcrypt.compare(passwordIn, success.token, function(err, isMatch) {
            if (err) {
                console.log(err)
            }
            console.log("isMatch: ", isMatch);
            console.log(success)
            if (isMatch) {
                res.json(success);
            } else {
                res.send("login error");
            }
        })
      }
    })
}



function create(req, res) {
    db.Profile.findOne({
        userId: req.body.userId
    }, function(err, success) {
        if (success) {
            res.send("exist error");
            return;
        } else {
            const saltRounds = 10;
            bcrypt.hash(req.body.pwd, saltRounds, function(err, hash) {
                // Store hash in your password DB.
                if (err) {
                    console.log(err)
                }
                var newProfile = new db.Profile({
                    name: req.body.name,
                    gender: req.body.gender,
                    userId: req.body.userId,
                    age: req.body.age,
                    feet: req.body.feet,
                    inch: req.body.inch,
                    weight: req.body.weight,
                    fitnessGoal: req.body.fitnessGoal,
                    token: hash
                })
                var timeIn = decodeURI(req.body.time);
                var newWeight = new db.Weight({
                    userId: req.body.userId,
                    time: timeIn,
                    weight: req.body.weight
                })
                // console.log(newProfile);
                newWeight.save(function(err, success) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("newWeight: ", newWeight);
                })
                newProfile.save(function(err, success) {
                    if (err) {
                        return console.log(err);
                    }
                    res.json(success);
                    console.log("newProfile: ", newProfile);
                    // console.log(success);
                })
            })
        }


    });
}

module.exports = {
    create: create,
    logIn: logIn,
    cookieLogIn: cookieLogIn,
    updateWeight: updateWeight,
    updateFitnessGoal: updateFitnessGoal
};