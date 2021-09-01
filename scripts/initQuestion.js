const addresses = require('../frontend/src/contracts/addresses.json');
const TruthDisco = require('../frontend/src/contracts/TruthDisco.json');

async function main() {

  const signer = await ethers.getSigner(0);
  let networkData = await signer.provider.getNetwork()
  console.log("Chain ID:", networkData.chainId);
  console.log(signer.address)

  let tdContract = new ethers.Contract(
    addresses.TruthDisco[networkData.chainId],
    TruthDisco.abi,
    signer);


  let testVal = await tdContract.initQuestion("Blah");
  // console.log(testVal);



}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
