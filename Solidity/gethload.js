function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in eth.accounts) {
        var acct = eth.accounts[acctNum];
        var acctBal = web3.fromWei(eth.getBalance(acct), 'ether');
        totalBal += parseFloat(acctBal);
        console.log('  eth.accounts[' + acctNum + ']: \t' + acct + ' \tbalance: ' + acctBal + ' ether');
    }
    console.log('  Total balance: ' + totalBal + ' ether');
}

function sendMoney() {
    console.log('money');
    console.log(eth.blockNumber);
    personal.unlockAccount(eth.accounts[0], '');
    personal.unlockAccount(eth.accounts[1], '');
    var txhash = eth.sendTransaction({
        from: eth.accounts[0],
        to: eth.accounts[1],
        value: web3.toWei(1.1, 'ether')
    });
    console.log('txhash=', txhash);
    var t = eth.getTransaction(txhash);
    console.log(JSON.stringify(t));
}

function makeContract() {
    console.log('make contract');
}
