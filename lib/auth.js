const crypto = require('crypto');

const fromBase64 = base64 =>
  base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const genereteToken = (len = 16) => new Promise((resolve, reject) => {
  crypto.randomBytes(len, (error, data) => {
    error ? reject(error) : resolve(fromBase64(data.toString('base64')));
  });
});



module.exports = {
  genereteToken
}