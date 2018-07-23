var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://opo:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');

import { MoneyFacade } from './money';


let abi = JSON.parse(fs.readFileSync('Purchase.abi'));
let code = '0x' + fs.readFileSync('Purchase.bin');
console.log('password=', config.password);


 
    

  

var addr = config.addr;
let contract2 = new web3.eth.Contract(abi, addr);
//console.log('contract2=', contract2);
let contract3 = contract2.methods 
  .confirmPurchase()
  .encodeABI();console.log('abi=', contract3);
  
  var facade = new MoneyFacade({
    To: addr,
    From: '0x95d6cC59EB07f93969A899a348fdabeF0cA6a357',
    Password: config.password,
    Money: '0.01',
    Code: contract3
  });
  facade
    .doSendEthereum(
      'd64e5bb7f71d459a928cec55cf027420b2a18c3cc43d50fda3138324cab1ef01c12284456f2914c3cc44d9613d1bbc4616ad1c614608c39350c2581c9cf2f0bcb70a691806f66ab3079273f04559359c'
    )
    .then(result => {
      console.log(result);
    });


function test() {
	var coinbase: any = {};
	web3.eth
		.getAccounts()
		.then(result => {
			coinbase = result[0];
			web3.eth.personal.unlockAccount(coinbase, config.password);
		})
		.then(result => {
			console.log('coinbase=', coinbase);
			var addr = '0x94663C287193253316a15f15cBb1c8aFE77b7C06';
			let contract2 = new web3.eth.Contract(abi, addr);
			contract2.methods
				.confirmPurchase()
				.send({
					from: coinbase,
					gas: 1000000,
					value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether'))
				})
				.on('transactionHash', txhash => {
					console.log('txhash=', txhash);
				})
				.then(function(newContractInstance) {
					console.log(newContractInstance.options.address); // instance with the new contract address
				});

			//console.log("Your contract is being deployed in transaction at http://testnet.etherscan.io/tx/" + contract2.transactionHash);
		});
}
