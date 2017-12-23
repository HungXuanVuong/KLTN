const crypto = require('crypto').randomBytes(256).toString('hex');

var config = {
    db : 'mongodb://localhost:27017/tlcn',
    secret: crypto
};

module.exports = config;