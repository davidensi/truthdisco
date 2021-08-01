pragma solidity 0.7.3;


contract Questions {

struct Answer {
  address submittedBy;
  //The actual submission will be encrypted
  string submission;
}

  struct Question {
    bool active;
    string stimulus;

    mapping (uint=>Answer) answerList;
    uint numAnswers;
  }

  mapping (uint=>Question) private _questions;
  uint private _numQuestions;

  //initQuestion
  // TODO **Permissioned** need to add these
  //This should emit and event
  function initQuestion(string memory stim) public {

    Question storage newQ;
    newQ.active = true;
    newQ.stimulus = stim;
    newQ.numAnswers = 0;

    _questions[_numQuestions] = newQ;
    _numQuestions++;
  }

  //scanSubmissions
  //**public view

  //submitAnswer
  //**public transaction

}
