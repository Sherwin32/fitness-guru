var db = require('../models');
var bcrypt = require('bcrypt');


function logIn(req, res){
  console.log(req.body)
  var passwordIn = req.body.pwd;

    console.log("got login request pwd: ", passwordIn);
    db.Profile.findOne({id: req.body.id}, function(err, success){
      if(err){return res.send(err)}
        console.log(success.token)
      bcrypt.compare(passwordIn, success.token, function(err, isMatch){
        if(err){console.log(err)}
        console.log("isMatch: ", isMatch);
        console.log(success)
        if(isMatch){
          res.json(success);
        }
      })
    })
//   bcrypt.compare(passwordIn, hash, function(err, res) {
//     // res == true
//     console.log(res);
//     if(res){
//       db.Profile.findOne({id: req.body.id}, function(err, success){
//         if(err){return console.log(err);}
//         res.json(success);
//     })  
//     }else{
//       res.send("invalid user");
//     }
// });

}



function create(req, res){
  db.Profile.findOne({id: req.body.id}, function(err, success){
    if(success){
      res.send("exist error");
      return;
    }else{
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


});
}

module.exports = {
  create: create,
  logIn: logIn
};