var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://local:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');

let abi = JSON.parse(fs.readFileSync('Purchase.abi'));
let code = '0x' + fs.readFileSync('Purchase.bin');


web3.eth
  .getAccounts()
  .then(result => {
    console.log( result );
  });


