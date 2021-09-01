// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
/* pragma experimental ABIEncoderV2; */
pragma abicoder v2;

import './Reputations.sol';
import './Questions.sol';

import "hardhat/console.sol";


/** This contains the API methods that are accessible on the chain.
** permisions are managed in this contract, and the methods are delegated
** to the child-contracts **/
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


  function initQuestion(string memory stimulus) public {
    require(msg.sender == _owner, "Only the administrator can create questions");

    console.log("_owner: %s", _owner);
    console.log("msg.sender: %s", msg.sender);

    console.log("initialising question with stimulus: %s", stimulus );
    _questions.initQuestion(stimulus);
  }

  function submitAnswer(uint qId, string memory sub) public {

    _questions.submitAnswer(qId, msg.sender, sub);

    console.log("User: %s, QuestionID: %s, Submission: %s", msg.sender, qId, sub);

  }

  function closeQuestion(uint qId) public {
    require(msg.sender == _owner, "Only the administrator can close questions");
    _questions.closeQuestion(qId);
    console.log("Closing question: %s", qId);
  }


  /* Returns true if the question is ready to be closed (according
  ** to the reputation of the answers submitted so far) */
  /* function checkQuestion(uint qId) public view returns (bool) {
    //Must access external repuation calculator
    return true;
  } */

  /* This  function:
    1) Checks the question is ready to close
    2) Closes the Question
    3) Updates reputations
    4) Distributes the reward tokens
  */
  /* function completeQuestion(uint qId) public returns (bool) {

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

  } */
}
