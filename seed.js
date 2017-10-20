// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
//seed.js

var db = require("./models");
var controller = require('./controller');

var weightList =[
  {"userId": "sherwin", "time": "Thu Oct 01 2017 12:25:11 GMT-0700 (PDT)", "weight": "166"},
  {"userId": "sherwin", "time": "Thu Oct 02 2017 12:25:11 GMT-0700 (PDT)", "weight": "165"},
  {"userId": "sherwin", "time": "Thu Oct 05 2017 12:25:11 GMT-0700 (PDT)", "weight": "164"},
  {"userId": "sherwin", "time": "Thu Oct 06 2017 12:25:11 GMT-0700 (PDT)", "weight": "165"},
  {"userId": "sherwin", "time": "Thu Oct 07 2017 12:25:11 GMT-0700 (PDT)", "weight": "167"},
  {"userId": "sherwin", "time": "Thu Oct 09 2017 12:25:11 GMT-0700 (PDT)", "weight": "155"},
  {"userId": "sherwin", "time": "Thu Oct 13 2017 12:25:11 GMT-0700 (PDT)", "weight": "154"},
  {"userId": "sherwin", "time": "Thu Oct 15 2017 12:25:11 GMT-0700 (PDT)", "weight": "155"},
  {"userId": "sherwin", "time": "Thu Oct 17 2017 12:25:11 GMT-0700 (PDT)", "weight": "149"},
  {"userId": "sherwin", "time": "Thu Oct 18 2017 12:25:11 GMT-0700 (PDT)", "weight": "148"},
  {"userId": "sherwin", "time": "Thu Oct 19 2017 12:25:11 GMT-0700 (PDT)", "weight": "143"},
  {"userId": "tam94131", "time": "Thu Oct 01 2017 12:25:11 GMT-0700 (PDT)", "weight": "166"},
  {"userId": "tam94131", "time": "Thu Oct 02 2017 12:25:11 GMT-0700 (PDT)", "weight": "165"},
  {"userId": "tam94131", "time": "Thu Oct 05 2017 12:25:11 GMT-0700 (PDT)", "weight": "164"},
  {"userId": "tam94131", "time": "Thu Oct 06 2017 12:25:11 GMT-0700 (PDT)", "weight": "165"},
  {"userId": "tam94131", "time": "Thu Oct 07 2017 12:25:11 GMT-0700 (PDT)", "weight": "167"},
  {"userId": "tam94131", "time": "Thu Oct 09 2017 12:25:11 GMT-0700 (PDT)", "weight": "155"},
  {"userId": "tam94131", "time": "Thu Oct 13 2017 12:25:11 GMT-0700 (PDT)", "weight": "154"},
  {"userId": "tam94131", "time": "Thu Oct 15 2017 12:25:11 GMT-0700 (PDT)", "weight": "155"},
  {"userId": "tam94131", "time": "Thu Oct 17 2017 12:25:11 GMT-0700 (PDT)", "weight": "149"},
  {"userId": "tam94131", "time": "Thu Oct 18 2017 12:25:11 GMT-0700 (PDT)", "weight": "148"},
  {"userId": "tam94131", "time": "Thu Oct 19 2017 12:25:11 GMT-0700 (PDT)", "weight": "143"},
];

var profileList = [
{"name":"1", "gender":"male", "userId":"john22", "age":"26", "feet":"5", "inch":"5", "weight":"155", "fitnessGoal":"building", "token":"1"},
{"name":"2", "gender":"male", "userId":"kelvin01", "age":"36", "feet":"6", "inch":"8", "weight":"157", "fitnessGoal":"building", "token":"1"},
{"name":"3", "gender":"male", "userId":"dave33", "age":"37", "feet":"5", "inch":"7", "weight":"168", "fitnessGoal":"condition", "token":"1"},
{"name":"4", "gender":"male", "userId":"sherwin666", "age":"43", "feet":"6", "inch":"2", "weight":"188", "fitnessGoal":"condition", "token":"1"},
{"name":"5", "gender":"male", "userId":"jack3", "age":"66", "feet":"5", "inch":"3", "weight":"200", "fitnessGoal":"condition", "token":"1"},
{"name":"6", "gender":"male", "userId":"ken22", "age":"43", "feet":"6", "inch":"6", "weight":"188", "fitnessGoal":"building", "token":"1"},
{"name":"7", "gender":"male", "userId":"bill3", "age":"22", "feet":"5", "inch":"5", "weight":"169", "fitnessGoal":"strength", "token":"1"},
{"name":"kay00", "gender":"male", "userId":"kay00", "age":"24", "feet":"7", "inch":"6", "weight":"151", "fitnessGoal":"building", "token":"1"},
{"name":"alex33", "gender":"male", "userId":"alex33", "age":"25", "feet":"5", "inch":"7", "weight":"179", "fitnessGoal":"strength", "token":"1"},
{"name":"8", "gender":"male", "userId":"stt", "age":"38", "feet":"6", "inch":"11", "weight":"210", "fitnessGoal":"building", "token":"1"},
{"name":"9", "gender":"female", "userId":"dddxbb", "age":"23", "feet":"6", "inch":"1", "weight":"166", "fitnessGoal":"strength", "token":"1"},
{"name":"1", "gender":"female", "userId":"asdfedc", "age":"25", "feet":"5", "inch":"5", "weight":"165", "fitnessGoal":"strength", "token":"1"},
{"name":"2", "gender":"female", "userId":"ujmyhn", "age":"29", "feet":"5", "inch":"9", "weight":"145", "fitnessGoal":"strength", "token":"1"},
{"name":"3", "gender":"female", "userId":"yhnujm", "age":"50", "feet":"4", "inch":"11", "weight":"152", "fitnessGoal":"building", "token":"1"},
{"name":"4", "gender":"female", "userId":"dcdc", "age":"55", "feet":"5", "inch":"2", "weight":"168", "fitnessGoal":"building", "token":"1"},
{"name":"5", "gender":"female", "userId":"marval", "age":"21", "feet":"6", "inch":"5", "weight":"188", "fitnessGoal":"condition", "token":"1"},
{"name":"6", "gender":"female", "userId":"maria333", "age":"34", "feet":"7", "inch":"6", "weight":"177", "fitnessGoal":"condition", "token":"1"},
{"name":"7", "gender":"female", "userId":"summmmer", "age":"44", "feet":"5", "inch":"8", "weight":"166", "fitnessGoal":"condition", "token":"1"},
{"name":"8", "gender":"female", "userId":"kim007", "age":"48", "feet":"4", "inch":"9", "weight":"159", "fitnessGoal":"strength", "token":"1"},
{"name":"9", "gender":"female", "userId":"jingerale", "age":"27", "feet":"5", "inch":"11", "weight":"155", "fitnessGoal":"strength", "token":"1"},
]

db.Weight.remove({}, function(err, success) {
    // code in here runs after all weights are removed
    db.Weight.create(weightList, function(err, weight) {
        console.log("created ", weight.length, " weight history");
        db.Profile.remove({}, function(err, success) {
            // code in here runs after all profiles are removed
            db.Profile.create(profileList, function(err, profile) {
                console.log("created ", profile.length, " profile history");
                process.exit();
            });
        });
    });
});


