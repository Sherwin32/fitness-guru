var db = require('../models');
//Implementing bcrypt for authentication
var bcrypt = require('bcrypt');

//GET request for loging in using cookie.
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

//PUT request for updating user weight in his Profile data and create a Weight data history.
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

//PUT request for updating user fitness goal.
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

//POST request for creating a new account.
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
                if (err) {console.log(err)}
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
                    if (err) {return console.log(err)}
                    console.log("saved newWeight: ", newWeight, " in Weight database");
                })
                newProfile.save(function(err, success) {
                    if (err) {return console.log(err);}
                    res.json(success);
                    console.log("saved newProfile: ", newProfile, " in Profile database");
                })
            })
        }
    });
}

//GET request for loging in.
function logIn(req, res) {
    var passwordIn = req.query.pwd;
    console.log("got login request pwd: ", passwordIn);
    db.Profile.findOne({
        userId: req.query.userId
    }, function(err, success) {
        if (err) {return res.send(err)}
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

//GET request for all profile(for the scatter chart).
function getAll(req, res){
  db.Profile.find({}, function(err, all){
    if(err){return console.log(err)}
    res.json(all);
  })
}

//GET request for all profile(for the admin dashboard).
function getDashboard(req, res){
  var jsonReturn = {};
  var male = 0;
  var female = 0;
  var other = 0;
  db.Profile.find({}, function(err, all){
    if(err){return console.log(err)}
    jsonReturn.totalUser=all.length;
    db.Weight.find({}, function(err, allWeight){
      if(err){return console.log(err)}
      jsonReturn.totalWeight = allWeight.length;
      var avgWeight = 0;
      allWeight.forEach(function(person){
        avgWeight = avgWeight+parseInt(person.weight);
      })
      avgWeight = avgWeight / allWeight.length;
      jsonReturn.avgWeight = parseInt(avgWeight);
      db.Profile.find({gender:"male"}, function(err, allMale){
        if(err){return console.log(err)}
        if(allMale){male=allMale.length;}
        db.Profile.find({gender:"female"}, function(err, allFemale){
          if(err){return console.log(err)}
          if(allFemale){female=allFemale.length;}
          db.Profile.find({gender:"other"}, function(err, allOther){
            if(err){return console.log(err)}
            if(allOther){other=allOther.length;}
            var malePercentage = Math.round(male/(male+female+other)*100);
            var femalePercentage = Math.round(female/(male+female+other)*100);
            var otherPercentage = Math.round(other/(male+female+other)*100);
            jsonReturn.male = malePercentage || 0;
            jsonReturn.female = femalePercentage || 0;
            jsonReturn.other = otherPercentage || 0;
            res.json(jsonReturn);
          })
        })
      })
    })
  })
}

module.exports = {
    create: create,
    logIn: logIn,
    cookieLogIn: cookieLogIn,
    updateWeight: updateWeight,
    updateFitnessGoal: updateFitnessGoal,
    getAll: getAll,
    getDashboard: getDashboard
};