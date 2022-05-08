cd ./fabric-samples/test-network
./network.sh down
./network.sh up createChannel -c testnet -s couchdb
./network.sh deployCC -c testnet -ccn notas -ccp ../../chaincode -ccl typescript