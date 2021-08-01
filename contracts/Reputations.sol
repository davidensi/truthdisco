pragma solidity 0.7.3;

contract Reputations {

  //For now, only a single value reputation ledger.
  // Eventually, dynamic arrays(?) for reputation categories.

  struct Rep {
    int repValue;
  }

  mapping (address => Rep) private _reputations;

  function reputationOf(address user) external view returns (int256) {
    return _reputations[user].repValue;
  }

  function updateReputation(address user, int256 reputation) public returns (bool) {
    _reputations[user].repValue = reputation;
    //Should actually emit an event to signify this update
    return true;
  }


}
