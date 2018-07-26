./node_modules/.bin/solcjs --bin Greeter.sol
./node_modules/.bin/solcjs --abi Greeter.sol

mv Greeter_sol_Greeter.abi Greeter.abi
mv Greeter_sol_Greeter.bin Greeter.bin
