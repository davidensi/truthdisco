// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";

//Read only calculation contract
contract RepRewCalculator {

  function calculateReward(address[] memory users, uint[] memory reputations, string[] memory submissions) external view {
    console.log("Calculate rewards");
    string[] memory subs = new string[](users.length);
    uint unique = 0;
    uint[] memory points = new uint[](users.length);

    for(uint i = 0; i < users.length; i++) {
      for(uint j = i+1; j < users.length; i++) {
        if(users[i] == users[j]) {
          reputations[i] = 0;
        }
      }
    }

    uint maxPoints = 0;
    uint maxIndex;
    for(uint i = 0; i < users.length; i++) {
      if(reputations[i] > 0) {
        //Search for duplicates
        bool duplicateFound = false;
        for(uint j = 0; j < unique; j++) {
          //If a duplicate is found, add to its points
          if(compareStrings(submissions[i], subs[j])) {
            duplicateFound = true;
            points[j] = points[j] + reputations[i];
            if(points[j] > maxPoints) {
              maxPoints = points[j];
              maxIndex = j;
            }
          }
        }
        if(!duplicateFound) {
          subs[unique] = submissions[i];
          points[unique] = reputations[i];
        }
      }
    }




  }

  function compareStrings(string memory a, string memory b) private pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }
}
