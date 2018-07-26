/*
ethereum tx send
coded by jongwhan lee
leejw51@gmail.com
*/
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');
var keythereum = require("keythereum");
async function getNonceUser(addr: string): Promise<any> {
	var r = await web3.eth.getTransactionCount(addr)
	return r
}

async function getGasPriceUser(): Promise<any> {
	var ret = await web3.eth.getGasPrice()
	var eth = web3.utils.fromWei(ret)
	console.log(`gas price=${ret} wei   ${eth} eth`)
	return ret
}

function getPrivateKey(address: string) {
	var datadir = "../data";
	const password = "";

	var keyObject = keythereum.importFromFile(address, datadir);
	var privateKey = keythereum.recover(password, keyObject);
	return privateKey.toString('hex');
}

async function sendTransaction(signedTx: any) {
	return new Promise(
		(resolve) => {
			web3.eth.sendSignedTransaction('0x' + signedTx.toString('hex'), function (
				err: any, hash: any) {
				var info: any = {}
				info.Error = err
				info.Hash = hash
				resolve(info)
			})
		}
	)
}
async function sendUserRawTransaction(rawTx: any, privateKey: any) {
	const tx = new Tx(rawTx);
	const privateKeyBuffer = privateKey;
	tx.sign(privateKeyBuffer);
	const signedTx = tx.serialize();
	return sendTransaction(signedTx)
}

async function run() {
	var from = "0x9d16db949dffed9bf500eae1435a68a7cc9ec4df"
	var to = "0xabe82aa36616c6dea3f8326c3c70bd36194e1717"
	var ethToSend = '10.01'
	// get private-key by description
	var key = getPrivateKey(from)
	var nonce = await getNonceUser(from)
	var gas = await getGasPriceUser()
	var amount = web3.utils.toWei(ethToSend, 'ether')
	console.log(`Nonce=${nonce}    Gas=${gas}    Amount=${amount}`)
	const rawTx = {
		to: to,
		nonce: web3.utils.toHex(nonce), // nonce increase by 1
		value: web3.utils.toHex(amount), // amount in wei
		gasLimit: web3.utils.toHex(1000000), // limit of gas		
		gasPrice: web3.utils.toHex(10000000000), // 1 gas price in wei
		//gasPrice: web3.utils.toHex(gas), // 1 gas price in wei
	};
	await sendUserRawTransaction(rawTx, new Buffer(key, 'hex'))
	process.exit(0)
}

run()


