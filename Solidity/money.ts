var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
import { decrypt } from './user';

export class MoneyFacade {
	public web3: any;
	public to = '0x187A14ad464D06b312D4C8156CfD9C007b340504';
	public from = '0x28883430A26B28c7e48b04a8f603E0c8228Ba41d';
	public private2 = 'e5d567cc46d916364fb34279cd194dfc8c9bfb8bd4fbfcfce52740f4a0b6f5ef';
	public privateKey: any;
	public password: any;
	public info: any = {};
	public code: string = '';
	public money: string = '0';

	constructor(info: any) {
		this.web3 = new Web3(new Web3.providers.HttpProvider('http://opo:8545'));
		this.info = info;
		this.to = info.To;
		this.from = info.From;
		this.password = info.Password;
		this.money = info.Money;
		this.code = info.Code;
	}

	getNonce = () => {
		return new Promise((resolve, reject) => {
			this.web3.eth.getTransactionCount(this.web3.eth.defaultAccount, (error: any, result: any) => {
				resolve(this.web3.utils.toHex(result));
			});
		});
	};
	getGasPrice = () => {
		return new Promise((resolve, reject) => {
			this.web3.eth.getGasPrice((error: any, result: any) => {
				//resolve(this.web3.utils.toHex(result.toNumber()));
				resolve(this.web3.utils.toHex(result));
			});
		});
	};

	sendRawTransaction = (rawTx: any) => {
		return new Promise((resolve, reject) => {
			const tx = new Tx(rawTx);
			const privateKeyBuffer = this.privateKey;

			tx.sign(privateKeyBuffer);
			const serializedTx = tx.serialize();
			this.web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err: any, hash: any) {
				var info: any = {};
				info.Error = err;
				info.Hash = hash;
				resolve(info);
			});
		});
	};

	doSendEthereum = (userPrivateKey: string) => {
		return new Promise((resolve, reject) => {
			this.web3.eth.defaultAccount = this.from;
			this.private2 = decrypt(userPrivateKey, this.password);
			console.log('DecriptedKey=', this.private2);
			this.private2 = this.private2.substring(2);
			this.privateKey = new Buffer(this.private2, 'hex');

			Promise.all([this.getNonce(), this.getGasPrice()])
				.then(values => {
					const rawTx = {
						to: this.to,
						gasLimit: this.web3.utils.toHex(1000000),
						value: this.web3.utils.toHex(this.web3.utils.toWei(this.money, 'ether')),
						nonce: values[0], // nonce
						gasPrice: values[1], // gas price
						data: this.code
					};

					return rawTx;
				})
				.then(this.sendRawTransaction)
				.then((result: any) => {
					resolve(result);
				}); // end
		});
	};

	sendEthereums = (info: any) => {
		let row = info[0];
		row.PrivateDescrypted = decrypt(row.Private, this.password);
		row.Compare = info.Info === info.PrivateDescrypted;
		return this.doSendEthereum(row.Private);
	};
}
