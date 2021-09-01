const addresses = require('../frontend/src/contracts/addresses.json');
const TruthDisco = require('../frontend/src/contracts/TruthDisco.json');

async function main() {

  // signer is the deploying address
  const signer = await ethers.getSigner(0);
  let networkData = await signer.provider.getNetwork()
  console.log("Chain ID:", networkData.chainId);
  console.log(signer.address);


  //non-deployer addresses
  const signer1 = await ethers.getSigner(1);
  console.log("#1: " + signer1.address)
  let tdContract1 = new ethers.Contract(
    addresses.TruthDisco[networkData.chainId],
    TruthDisco.abi,
    signer1);

  await tdContract1.submitAnswer(0, "Submission string");

  const signer2 = await ethers.getSigner(2);
  console.log("#2: " + signer2.address)
  let tdContract2 = new ethers.Contract(
    addresses.TruthDisco[networkData.chainId],
    TruthDisco.abi,
    signer2);

  await tdContract2.submitAnswer(0, "Submission string");

  const signer3 = await ethers.getSigner(3);
  console.log("#3: " + signer3.address)
  let tdContract3 = new ethers.Contract(
    addresses.TruthDisco[networkData.chainId],
    TruthDisco.abi,
    signer3);

  await tdContract3.submitAnswer(0, "Submission sing");

  const signer4 = await ethers.getSigner(4);
  console.log("#4: " + signer4.address)
  let tdContract4 = new ethers.Contract(
    addresses.TruthDisco[networkData.chainId],
    TruthDisco.abi,
    signer4);

  await tdContract4.submitAnswer(0, "Submission string");








}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
