// require express and other modules
var express = require('express');
var app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
    extended: true
}));



// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// bcrypt
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

/************
 * DATABASE *
 ************/

var db = require('./models');
var controller = require('./controller');

/**********
 * ROUTES *
 **********/
// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
	console.log("got homepage request");
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/profile', controller.profile.create);

app.get('/profile', controller.profile.logIn);

app.get('/profile/cookie', controller.profile.cookieLogIn);


/*
 * JSON API Endpoints
 */

//  app.get('/api/album', controller.album.getAlbums);

//  app.post('/api/album', controller.album.create);

// app.get('/api', controller.api.sendAPI);

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running on http://localhost:3000/');
});