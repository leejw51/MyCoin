/*
ethereum tx send
coded by jongwhan lee
leejw51@gmail.com
*/
var Web3 = require('web3');
var net = require('net')
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var web3 = new Web3('../data/geth.ipc', net) // mac os path
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
	await web3.eth.personal.unlockAccount(from, config.password)
	var tx = {
		from: from,
		to: to,
		value: web3.utils.toWei(ethToSend, 'ether')
	}
	var result = await web3.eth.sendTransaction(tx)
	console.log(result)
	process.exit(0)
}

run()


