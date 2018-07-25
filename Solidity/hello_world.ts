var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var net = require('net')
var web3 = new Web3('../data/geth.ipc', net) // mac os path
var Tx = require('ethereumjs-tx')
var fs = require('fs')
var config = require('../config.js')

async function run() {
  let abi = JSON.parse(fs.readFileSync('Greeter.abi'))
  let code = '0x' + fs.readFileSync('Greeter.bin')
  var coinbase: any = {};
  const accounts = await web3.eth.getAccounts()
  var personA = accounts[0]
  var personB = accounts[3]
  var balanceA = await web3.eth.getBalance(personA)
  var balanceB = await web3.eth.getBalance(personB)
  console.log(`A: ${personA} ${balanceA}`)
  console.log(`B: ${personB} ${balanceB}`)
  await web3.eth.personal.unlockAccount(personA, config.password)


  var addr = personA
  //console.log(`abi=${JSON.stringify(abi)}  addr=${addr}`)
  var greeter: any = new web3.eth.Contract(abi, addr);
  console.log(await greeter.methods.getBlockNumber().call())
  //var response = await greeter.methods.greet().call({})
  //console.log(greeter)

}

run()
/*
web3.eth.getCoinbase().then(result => {
  coinbase = result;
  //  web3.eth.personal.unlockAccount(coinbase, config.password);
  var addr = config.addr;
  var greeter: any = new web3.eth.Contract(abi, addr);
  greeter.methods.greeting().call({})
    .then(result => {
      console.log('greeting=', result);
    });

  greeter.methods.value().call({ from: coinbase, gas: 3000000 })
    .then(result => {
      console.log('value=', result);
    });

  greeter.methods.buyer().call({ from: coinbase, gas: 3000000 })
    .then(result => {
      console.log('buyer=', result);
    });

  greeter.methods.seller().call({ from: coinbase, gas: 3000000 })
    .then(result => {
      console.log('seller=', result);
    });

  greeter.methods.state().call({})
    .then(result => {
      console.log('state=', result);
    });

});
*/
