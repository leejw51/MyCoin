var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var Tx = require('ethereumjs-tx');
var fs = require('fs');
var config = require('../config.js');
console.log(config.password);

async function run() {
    var accounts = await web3.eth.getAccounts()
    for (let m of accounts) {
        var amount = web3.utils.fromWei(await web3.eth.getBalance(m))
        console.log(`${m} amount=${amount} Eth`)
    }
}

run()