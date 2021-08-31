// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
/* pragma experimental ABIEncoderV2; */
pragma abicoder v2;

import './Reputations.sol';
import './Questions.sol';
/* import './Tokens/DiscoCoin.sol'; */

contract TruthDisco {

  address _owner;

  //Reputation ledger
  Reputations _reputations;

  //Questions record
  Questions _questions;

  //Reward tokens
  address _tokenAddr;


  constructor(address tokenAddress) {
    _owner = msg.sender;
    _reputations = new Reputations();
    _questions = new Questions();
    _tokenAddr = tokenAddress;


  }


  /* Returns true if the question is ready to be closed (according
  ** to the reputation of the answers submitted so far) */
  function checkQuestion(uint qId) private returns (bool) {
    //Must access external repuation calculator
    return true;
  }

  /* This  function:
    1) Checks the question is ready to close
    2) Closes the Question
    3) Updates reputations
    4) Distributes the reward tokens
  */
  function completeQuestion(uint qId) private returns (bool) {



    if(checkQuestion(qId) == true) {
      _questions.closeQuestion(qId);

      Questions.Answer[] memory answers = _questions.scanSubmissions(qId);

      //Calculations
      for(uint i = 0; i < answers.length; i++) {

      }

      return true;


    } else {
      return false;
    }

  }
}
