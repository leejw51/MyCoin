./node_modules/.bin/solcjs --bin Greeter.sol
./node_modules/.bin/solcjs --abi Greeter.sol
./node_modules/.bin/solcjs --bin News.sol
./node_modules/.bin/solcjs --abi News.sol
./node_modules/.bin/solcjs --bin Purchase.sol
./node_modules/.bin/solcjs --abi Purchase.sol

mv Purchase_sol_Purchase.abi Purchase.abi
mv Purchase_sol_Purchase.bin Purchase.bin
mv News_sol_News.abi News.abi
mv News_sol_News.bin News.bin
mv Greeter_sol_News.abi Greeter.abi
mv Greeter_sol_News.bin Greeter.bin
