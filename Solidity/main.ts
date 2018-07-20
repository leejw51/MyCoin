var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
var Tx = require('ethereumjs-tx')
var fs = require('fs')

async function run() {
    var accounts = web3.eth.accounts
    for (let m in accounts) {
        var a = accounts[m]
        console.log(`${a} ${web3.eth.getBalance(a)}`)
    }
}

run()
