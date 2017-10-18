var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'sherwin';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  console.log(hash);
  console.log(typeof hash)
  bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
    console.log(res);
});
});