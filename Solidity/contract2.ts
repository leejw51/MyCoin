var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://opo:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');

let abi = JSON.parse(fs.readFileSync('Purchase.abi'));
let code = '0x' + fs.readFileSync('Purchase.bin');

var coinbase: any = {};
web3.eth.getCoinbase().then(result => {
  coinbase = result;
//  web3.eth.personal.unlockAccount(coinbase, config.password);

  
  
  
  
  var addr = config.addr;

  var greeter: any = new web3.eth.Contract(abi, addr);

 
  
  greeter.methods.greeting().call({})
  .then(result => {
    console.log('greeting=', result);
  });

  greeter.methods.value().call({from: coinbase, gas: 3000000})
  .then(result => {
    console.log('value=', result);
  });

  greeter.methods.buyer().call({from: coinbase, gas: 3000000})
  .then(result => {
    console.log('buyer=', result);
  });

  greeter.methods.seller().call({from: coinbase, gas: 3000000})
  .then(result => {
    console.log('seller=', result);
  });

  greeter.methods.state().call({})
  .then(result => {
    console.log('state=', result);
  });

});
  
