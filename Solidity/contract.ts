import { MoneyFacade } from './money';
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://opo:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');

let abi = JSON.parse(fs.readFileSync('Purchase.abi'));
let code = '0x' + fs.readFileSync('Purchase.bin');

let contract2 = new web3.eth.Contract(abi, null, {
	gas: 1000000,
	data: code
});
let contract3 = contract2
	.deploy({
		data: code,
		arguments: ['Amazon Google']
	})
	.encodeABI();
console.log('contract3=', contract3);
var facade = new MoneyFacade({
	To: '',
	From: '0x187A14ad464D06b312D4C8156CfD9C007b340504',
	Password: '1234',
	Money: '0.01',
	Code: contract3
});
facade
	.doSendEthereum(
		'460d5eb3598a224285bd3554579b04dd23f9c294180f450d8b3dada5c11aba35f785cb01cc925136dc6626b54e82b5836d25c5ed74ae18b2ebb4ec1a2a2b1315a22dacd10fec6b9212d1322c0007633f'
	)
	.then(result => {
		console.log(result);
	});

function test() {
	var coinbase: any = {};
	web3.eth
		.getCoinbase()
		.then(result => {
			coinbase = result;
			web3.eth.personal.unlockAccount(coinbase, config.password);
		})
		.then(result => {
			console.log('coinbase=', coinbase);
			let contract2 = new web3.eth.Contract(abi, null, {
				from: coinbase,
				gas: 1000000,
				data: code
			});
			contract2
				.deploy({
					data: code,
					arguments: ['Amazon Google']
				})
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
