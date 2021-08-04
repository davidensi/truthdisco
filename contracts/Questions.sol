pragma solidity 0.7.3;
pragma experimental ABIEncoderV2;


//This should be a single contract.
contract Questions {

  struct Answer {
    address submittedBy;
    //The actual submission will be encrypted
    string submission;
  }

  struct Question {
    bool active;
    string stimulus;
    uint ansCount;
  }


  /* _questions[i] gets the Question struct for question with ID i */
  mapping (uint => Question) private _questions;
  uint private _numQuestions;

  /* _numAnswers[i] is the number of answers submitted to question with ID i */
  /* _answers[i][j] returns the jth answer that was submitted to the ith question */
  /* mapping (uint => mapping(uint => uint)) private _numAnswers; */
  mapping (uint => mapping(uint=>Answer)) private _answers;


  //initQuestion
  // TODO need to add **Permission**
  //This should emit an event
  function initQuestion(string memory stim) public {

    /* Question memory newQ = Question(true, stim, 0); */
    _questions[_numQuestions] = Question(true, stim, 0);

    //Emit event "New question opened"

    _numQuestions++;

  }

  //scanSubmissions
  //**public view
   function scanSubmissions(uint qId) public view returns (Answer[] memory ) {
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
  function submitAnswer(uint qId, address user, string memory sub) public {

    /*TODO Check if a question is closed first*/

    /* Answer memory newAns = Answer(user, sub); */
    _answers[qId][_questions[qId].ansCount] = Answer(user, sub);

    //Emit event "New answer submitted"

    _questions[qId].ansCount++;

  }

}
