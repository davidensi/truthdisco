const { expect } = require("chai");

describe("Reputations", function() {
  it("Should allow an update to a reputation", async function() {
    const Reputations = await ethers.getContractFactory("Reputations");
    const reputations = await Reputations.deploy();

    const address = "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7";

    expect(await reputations.reputationOf(address)).to.equal(0);

  });
});
