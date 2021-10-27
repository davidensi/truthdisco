const fs = require('fs');
const path = require('path');


/* publishContract places the contract data in the frontend directory so
** the web app can access it */
async function publishContract(contract, contractName, chainId, publicKey, repRewAddress) {

  console.log(contractName + " contract address: " + contract.address);

  // copy the contract JSON file to front-end and add the address field in it
  fs.copyFileSync(
    path.join(__dirname, "../artifacts/contracts/" + contractName + ".sol/" + contractName + ".json"), //source
    path.join(__dirname, "../frontend/src/contracts/" + contractName + ".json") // destination
  );

  // check if addresses.json already exists
  let exists = fs.existsSync(path.join(__dirname, "../frontend/src/contracts/addresses.json"));

  // if not, created the file
  if (!exists) {
    fs.writeFileSync(
      path.join(__dirname, "../frontend/src/contracts/addresses.json"),
      "{}"
    );
  }


  // update the addresses.json file with the new contract address
  let addressesFile = fs.readFileSync(path.join(__dirname, "../frontend/src/contracts/addresses.json"));
  let addressesJson = JSON.parse(addressesFile);

  console.log(addressesJson)

  if (!addressesJson[contractName]) {
    addressesJson[contractName] = {};
  }

  addressesJson[contractName][chainId] = contract.address;
  addressesJson[contractName]["ownerAddr"] = contract.signer.address;
  addressesJson[contractName]["publicKey"] = publicKey;
  addressesJson[contractName]["repRewCalc"] = repRewAddress;

  fs.writeFileSync(
    path.join(__dirname, "../frontend/src/contracts/addresses.json"),
    JSON.stringify(addressesJson)
  );
}


async function main() {

  const deployer = await ethers.getSigner(0);

  let networkData = await deployer.provider.getNetwork()
  console.log("Chain ID:", networkData.chainId);

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  /* The token doesn't need publishing as it will be managed by the td contract
  ** The address will need to be added to the wallet */
  // const tokenFactory = await ethers.getContractFactory("DiscoCoin");
  // const tokenContract = await tokenFactory.deploy("DiscoCoin", "DSC");


  const repRewCalcFactory = await ethers.getContractFactory("RepRewCalculator");
  const repRewCalcContract = await repRewCalcFactory.deploy();

  fs.copyFileSync(
    path.join(__dirname, "../artifacts/contracts/" + "RepRewCalculator" + ".sol/" + "RepRewCalculator" + ".json"), //source
    path.join(__dirname, "../frontend/src/contracts/" + "RepRewCalculator" + ".json") // destination
  );

  const tdName = "TruthDisco";
  const tokenName = "RepCoin";
  const tokenSymbol = "REP";
  const PUBLICKEY = "mtrHp1WHZM9rxF2Ilot9Hie5XmQcKCf7oDQ1DpGkTSI=";

  const tdFactory = await ethers.getContractFactory(tdName);
  const tdContract = await tdFactory.deploy(PUBLICKEY, tokenName, tokenSymbol);

  await publishContract(tdContract, tdName, networkData.chainId, PUBLICKEY, repRewCalcContract.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
