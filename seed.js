// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
//seed.js

var db = require("./models");
var controller = require('./controller');

var weightList =[
  // data here soon!
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
];

db.Weight.remove({}, function(err, success){
  // code in here runs after all albums are removed
  db.Weight.create(weightList, function(err, weight){
  	console.log("all weight:", weight);
    console.log("created ", weight.length, " weight history");
    process.exit();
  });
  // db.Album.create(albumList, function(err, album){
  // 	  console.log("all albums:", album);
  //   console.log("created", album.length, "albums");
  //   process.exit();
  // })
});
