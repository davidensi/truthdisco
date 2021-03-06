// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;
/* pragma experimental ABIEncoderV2; */
pragma abicoder v2;


import "hardhat/console.sol";
//This should be a single contract.
contract Questions {

  struct Answer {
    //The actual submission will be encrypted
    address submittedBy;
    uint256 reputation;
    string submission;
  }

  struct Question {
    uint id;
    bool active;
    string stimulus;
    uint ansCount;
    string answer;
  }

  event QuestionCreated(uint _questionId, string _stimulus);

  /* _questions[i] gets the Question struct for question with ID i */
  mapping (uint => Question) private _questions;
  mapping (uint => mapping(uint=>Answer)) private _answers;
  uint private _numQuestions;
  uint private _numActiveQuestions;

  constructor() {
    console.log("Question instance created");
    _numQuestions = 0;
    _numActiveQuestions = 0;
  }
  /* _numAnswers[i] is the number of answers submitted to question with ID i */
  /* _answers[i][j] returns the jth answer that was submitted to the ith question */
  /* mapping (uint => mapping(uint => uint)) private _numAnswers; */

  //getQuestionList - returns a list of question indices
  function getQuestionList() public view returns (Question[] memory) {

    /* Question[] memory activeQs = new Question[](_numActiveQuestions); */
    Question[] memory qs = new Question[](_numQuestions);

    for(uint i = 0; i < _numQuestions; i++) {
      qs[i] = _questions[i];
    }

    return qs;
    /* for(uint i = 0; i < _numActiveQuestions; i++) {
      if(_questions[i].active) {
        activeQs[i] = _questions[i];
      }
    }

    return activeQs; */
  }

  /* function getQuestion(uint qId) public view returns (Question memory) {
    return _questions[qId];
  } */
  //initQuestion
  // TODO need to add **Permission**
  //This should emit an event
  function initQuestion(string memory stim) public {
    //Permissions check done in api method

    console.log("questionID: %s", _numQuestions);
    _questions[_numQuestions] = Question(_numQuestions, true, stim, 0, '');


    //Emit event "New question opened"
    emit QuestionCreated(_numQuestions, stim);

    _numQuestions++;
    _numActiveQuestions++;

    console.log("Question count: %s", _numQuestions);

  }

  //scanSubmissions
  //**public view
   function scanSubmissions(uint qId) public view returns (Answer[] memory) {
    uint size = _questions[qId].ansCount;
    Answer[] memory submissions = new Answer[](size);
    for(uint i = 0; i < size; i++) {
      Answer storage ans = _answers[qId][i];
      submissions[i] = ans;
    }
    return submissions;
  }

  //submitAnswer
  //**public transaction
  function submitAnswer(uint qId, address user, uint256 rep, string memory sub) public {
    require(qId < _numQuestions, "Invalid question ID - question does not exist");
    require(_questions[qId].active , "Invalid question ID - question has been closed");


    /* Answer memory newAns = Answer(user, sub); */
    _answers[qId][_questions[qId].ansCount] = Answer(user, rep, sub);

    //Emit event "New answer submitted"

    _questions[qId].ansCount++;

  }

/*
  function processRewards() private {

    console.log("processing rewards....");
    //emit a reward event
  } */

  function closeQuestion(uint qId, string memory answer) public {
    //persmission check in interface method
    _questions[qId].active = false;
    _questions[qId].answer = answer;

    _numActiveQuestions--;

    /* processRewards(); */

    //emit a closure event
  }

}
