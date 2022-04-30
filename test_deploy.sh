cd ./../fabric-samples/test-network
./network.sh down
./network.sh up createChannel -c testnet  
./network.sh deployCC -c testnet -ccn notas -ccp ../../BlockChainNotas/chaincode -ccl typescript