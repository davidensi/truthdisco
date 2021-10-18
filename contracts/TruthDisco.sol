// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
/* pragma experimental ABIEncoderV2; */
pragma abicoder v2;

import './Modules/Reputations.sol';
import './Modules/Questions.sol';

import "hardhat/console.sol";


/** This contains the API methods that are accessible on the chain.
** permisions are managed in this contract, and the methods are delegated
** to the child-contracts **/
contract TruthDisco {


  address public _owner;

  //Reputation ledger
  Reputations _reputations;

  //Questions record
  Questions _questions;

  //Reward tokens
  address public _tokenAddr;

  //Public key - of owner
  string public _publicKey;



  constructor(address tokenAddress, string memory publicKey) {
    _owner = msg.sender;
    _reputations = new Reputations();
    _questions = new Questions();
    _tokenAddr = tokenAddress;
    _publicKey = publicKey;
  }

  function getQuestions() public view returns(Questions.Question[] memory) {
    return _questions.getQuestionList();
  }

  /* function fetchQuestion(uint qId) public view returns(Questions.Question memory) {
    return _questions.getQuestion(qId);
  } */

  function initQuestion(string memory stimulus) public {
    require(msg.sender == _owner, "Only the administrator can create questions");

    console.log("_owner: %s", _owner);
    console.log("msg.sender: %s", msg.sender);

    console.log("initialising question with stimulus: %s", stimulus );
    _questions.initQuestion(stimulus);
  }


  function submitAnswer(uint qId, string memory sub) public {

    uint256 rep = _reputations.reputationOf(msg.sender);
    _questions.submitAnswer(qId, msg.sender, rep, sub);

    console.log("User: %s, QuestionID: %s, Submission: %s", msg.sender, qId, sub);

  }

  /* function closeQuestion(uint qId) public {
    require(msg.sender == _owner, "Only the administrator can close questions");
    _questions.closeQuestion(qId);
    console.log("Closing question: %s", qId);
  }
 */
  function getQuestionSubmissions(uint qId) public view returns (Questions.Answer[] memory) {
    require(msg.sender == _owner, "Only the administrator can request submissions");

    console.log("check answers for question: %s", qId);
    return _questions.scanSubmissions(qId);

  }

  function processQuestion(uint qId, address[] memory users,
      uint[] memory reputations, uint[] memory rewards, string memory answer) public {
    require(msg.sender == _owner, "Only the administrator can allocate rewards");

    console.log("processing Question %s", qId);
    console.log("Final answer is: %s", answer);
    for(uint i = 0; i < users.length; i++) {
      console.log("User: %s", users[i]);
      console.log("gets reward of: %s", rewards[i]);
      console.log("And their reputation is now: %s", reputations[i]);

    }
      /* _tokenAddr.call(bytes4(keccak256("reward(address, uint)")), users[i], rewards[i]); */


    _questions.closeQuestion(qId, answer);
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
