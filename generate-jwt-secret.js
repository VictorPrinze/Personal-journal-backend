const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(64).toString('hex');
console.log('Your JWT_SECRET:');
console.log(jwtSecret);