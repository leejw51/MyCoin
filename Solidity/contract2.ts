var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://opo:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');


let abi = JSON.parse( fs.readFileSync('Greeter_sol_Greeter.abi') );
let code = '0x' + fs.readFileSync('Greeter_sol_Greeter.bin');
//console.log('abi=',abi);
//console.log(bin);


web3.personal.unlockAccount( web3.eth.coinbase, config.password);
var txhash = '0x4085f4216e3e0a0244322664ce27d4b3038fa61b16200b64655516c8164aa649'
var addr = '0x274a32067c089ed757a4ff423c8998f90aef6754';

var greeter = web3.eth.contract(abi);
var greeterInstance = greeter.at(addr);
var a = greeterInstance.greet({from:web3.eth.accounts[0], gas: 3000000});
console.log('output=',a );

