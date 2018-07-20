var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://opo:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');


let abi = JSON.parse( fs.readFileSync('Greeter_sol_Greeter.abi') );
let code = '0x' + fs.readFileSync('Greeter_sol_Greeter.bin');
//console.log(abi);
//console.log(bin);


let MyContract = web3.eth.contract( abi );

web3.personal.unlockAccount( web3.eth.coinbase, config.password);

let contract2 = MyContract.new('hongikbank',{from: web3.eth.coinbase, gas: 1000000, data: code});
console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract2.transactionHash);



