var Web3 = require('web3');
//var web3 = new Web3('http://opo:8545');
var web3 = new Web3(new Web3.providers.HttpProvider('http://opo:8545'));
var Tx = require('ethereumjs-tx');


var from = '0x28883430A26B28c7e48b04a8f603E0c8228Ba41d';
var to = '0x95d6cC59EB07f93969A899a348fdabeF0cA6a357';
var private =
  'e5d567cc46d916364fb34279cd194dfc8c9bfb8bd4fbfcfce52740f4a0b6f5ef';
var privateKey = new Buffer(private, 'hex');
 
web3.eth.defaultAccount = from;

const getNonce = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(web3.eth.defaultAccount, (error, result) => {
      resolve(web3.utils.toHex(result));
    }); 
  });
};
const getGasPrice = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getGasPrice((error, result) => {
//      resolve(web3.utils.toHex(result.toNumber()));
      resolve(web3.utils.toHex(result));
    });
  });
};

const sendRawTransaction = rawTx => {
        return new Promise( (resolve, reject)=> {
  
  const tx = new Tx(rawTx);
  const privateKeyBuffer = privateKey;
  tx.sign(privateKeyBuffer);
  const serializedTx = tx.serialize();
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(
    err,
    hash
  ) {
    var info : any = {};
    info.Error = err;
    info.Hash = hash;
    console.log('OK=', info);
    resolve(info);

  });
        });
};

Promise.all([getNonce(), getGasPrice()])
  .then(values => {
    const rawTx = {
      to: to,
      gasLimit: web3.utils.toHex(1000000),
      value: web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
      nonce: values[0],
      gasPrice: values[1],
    };
    console.log(rawTx);
    return rawTx;
  })
  .then(sendRawTransaction)
  .then( (result)=> {
          console.log('done=', result);
  });
