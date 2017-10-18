var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/fitness-guru");

module.exports.Profile = require("./profile.js");
module.exports.Weight = require("./weight.js");
module.exports.Password = require("./password.js");
