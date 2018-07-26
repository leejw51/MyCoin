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
  console.log(`abi=${JSON.stringify(abi)}  addr=${addr}`)
  var greeter: any = new web3.eth.Contract(abi, addr);

  web3.eth.personal.unlockAccount(personA, config.password)
  let contract2 = new web3.eth.Contract(abi, null, {
    from: personA,
    data: code
  })
  var name = `Amazon Google ${new Date()}`
  console.log(name)
  let result = contract2.deploy({
    data: code,
    arguments: [name]
  })
  let contractResult = await result.send(
    {
      from: personA,
      gasLimit: web3.utils.toHex(1000000), // limit of gas		
      gasPrice: web3.utils.toHex(10000000000), // 1 gas price in wei
      value: web3.utils.toHex(web3.utils.toWei('0.00001', 'ether'))
    }
  ).on('transactionHash', (txhash: any) => {
    console.log('txhash=', txhash);
  })
  console.log(`Contract Create=${contractResult.options.address}`)
  let blockNumber = await contractResult.methods.getBlockNumber().call()
  console.log(`Block Number=${blockNumber}`)
  var say = await contractResult.methods.greet().call({})
  console.log(`greet=${say}`)

  process.exit(0)

}

run()
