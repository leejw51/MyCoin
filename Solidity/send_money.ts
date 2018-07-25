var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');

var keythereum = require("keythereum");



async function getNonceUser(addr: string): Promise<any> {
	var r = await web3.eth.getTransactionCount(addr)
	var ret = web3.utils.toHex(r)
	return ret
}

async function getGasPriceUser(): Promise<any> {
	var r = await web3.eth.getGasPrice()
	var ret = web3.utils.toHex(r)
	return ret
}

function getPrivateKey(address: string) {
	var datadir = "../data";
	const password = "";

	var keyObject = keythereum.importFromFile(address, datadir);
	var privateKey = keythereum.recover(password, keyObject);
	return privateKey.toString('hex');
}
async function run() {
	var from = "0x9d16db949dffed9bf500eae1435a68a7cc9ec4df"
	var key = getPrivateKey(from)
	console.log(key)
	var nonce = await getNonceUser(from)
	var gas = await getGasPriceUser()
	console.log(`Nonce=${nonce}    Gas=${gas}`)
}


run()


