var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://opo:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');
console.log( config.password );

var e = '0.01';
var price = web3.utils.toWei(e, 'ether')
console.log(e,'  ether === ', price, '  wei');

