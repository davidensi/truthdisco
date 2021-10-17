// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Reputations {

  //For now, only a single value reputation ledger.
  // Eventually, dynamic arrays(?) for reputation categories.

  struct Rep {
    uint repValue;
  }

  mapping (address => Rep) private _reputations;

  function reputationOf(address user) external view returns (uint) {
    //The client will have to initialise any non-existing reputations
    return _reputations[user].repValue;
  }

  function updateReputation(address user, uint reputation) public {
    _reputations[user].repValue = reputation;
    //Should emit an event to signify this update
  }


}
