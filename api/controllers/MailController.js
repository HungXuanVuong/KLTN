const nodemailer = require('nodemailer');

email = process.env.MAILER_EMAIL_ID || '',
pass = process.env.MAILER_PASSWORD || '';


// var client = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//       user: email, // Your email address
//       pass: pass // Your password
//   },
//   tls: { rejectUnauthorized: false }
// });

// // Create e-mail object to send to user
// var email = {
//   from: 'Admin HKGroup',
//   to: ['masazukass@gmail.com'],
//   subject: 'Password',
//   text: 'Hello'
//   // html: 'Hello<strong> </strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://www.herokutestapp3z24.com/activate/">http://www.herokutestapp3z24.com/activate/</a>'
// };
// // Function to send e-mail to the user
// client.sendMail(email, function(err, info) {
//   if (err) {
//       console.log(err); // If error with sending e-mail, log to console/terminal
//   } else {
//       console.log(info); // Log success message to console if sent
//       console.log(user.email); // Display e-mail that it was sent to
//   }
// });


var generatePassword = require('password-generator');

// var pass = generatePassword(12, false);

// console.log(pass);
var maxLength = 18;
var minLength = 12;
var uppercaseMinCount = 3;
var lowercaseMinCount = 3;
var numberMinCount = 2;
var specialMinCount = 2;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var SPECIAL_CHAR_RE = /([\?\-])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

function isStrongEnough(password) {
  var uc = password.match(UPPERCASE_RE);
  var lc = password.match(LOWERCASE_RE);
  var n = password.match(NUMBER_RE);
  var sc = password.match(SPECIAL_CHAR_RE);
  var nr = password.match(NON_REPEATING_CHAR_RE);
  return password.length >= minLength &&
    !nr &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount;
}

function customPassword() {
  var password = "";
  var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongEnough(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }
  return password;
}

console.log(customPassword());