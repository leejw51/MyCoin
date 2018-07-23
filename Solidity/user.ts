var sha256 = require('sha256');
var crypto = require('crypto');
var cryptoAlgorithm = 'aes-256-cbc';

export function encrypt(text: string, password: string) {
  var cipher = crypto.createCipher(cryptoAlgorithm, password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

export function decrypt(text: string, password: string) {
  var decipher = crypto.createDecipher(cryptoAlgorithm, password);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

