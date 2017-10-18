var db = require('../models');
var bcrypt = require('bcrypt');

function create(req, res){

const saltRounds = 10;
  bcrypt.hash(req.body.pwd, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  if(err){console.log(err)}
    var newProfile = new db.Profile({
  name: req.body.name,
  gender: req.body.gender,
  id: req.body.id,
  feet: req.body.feet,
  inch: req.body.inch,
  weight: req.body.weight,
  fitnessGoal: req.body.fitnessGoal,
  token: hash
})
  // console.log(newProfile);
    newProfile.save(function(err,success){
     if(err){return console.log(err);}
     res.json(success);
     console.log(newProfile);
     // console.log(success);
  })
})
}

module.exports = {
  create: create
};