// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "hardhat/console.sol";

//Read only calculation contract
contract RepRewCalculator {

  struct Results {
    address[] user;
    uint[] reputation;
    uint[] rewards;
    string answer;
  }

  function calculateReward(address[] memory users, uint[] memory reputations, string[] memory submissions)
      external view returns (Results memory) {
    console.log("Calculate rewards");
    uint unique = 0;


    //For now, assume no repeated submissions
    //Any repeated users (ie, multiple submissions get reputation set to zero)
    /* for(uint i = 0; i < users.length-1; i++) {
      for(uint j = i+1; j < users.length; i++) {
        if(users[i] == users[j]) {
          reputations[i] = 0;
        }
      }
    } */

    uint maxPoints = 0;
    uint maxIndex = 0;
    string[] memory subs = new string[](users.length);
    uint[] memory points = new uint[](users.length);

    for(uint i = 0; i < users.length; i++) {
      if(reputations[i] > 0) {
        //Search for duplicates
        bool duplicateFound = false;
        for(uint j = 0; j < unique; j++) {
          //If a duplicate is found, add to its points
          console.log("%s", submissions[i]);
          console.log("%s", subs[j]);

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
          unique++;
        }
        console.log("%s", subs[unique]);
      }
    }

    uint[] memory rewards = new uint[](users.length);
    for(uint i = 0; i < users.length; i++) {
      if(compareStrings(submissions[i], subs[maxIndex])) {
        //raise the rep of any user which got the correct answer
        if(reputations[i] != 0 && reputations[i] != 10) {
          reputations[i]++;
          //Rewards are equal to the number amount of reputation that they have
          rewards[i] = reputations[i];
        }
      } else {
        //otherwise, halve thir reputation
        if(reputations[i] > 1) {
          reputations[i] = reputations[i] / 2;
        }
      }
    }

    Results memory result = Results(users, reputations, rewards, subs[maxIndex]);

    return result;



  }

  function compareStrings(string memory a, string memory b) private pure returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
  }
}
