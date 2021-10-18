import { ethers } from 'ethers';

import addresses from '../../contracts/addresses.json';

//List contracts here
import TruthDisco from '../../contracts/TruthDisco.json';
import RepRewCalculator from '../../contracts/RepRewCalculator.json';

import enc from '../../plugins/encryption';

const state = {
  questions: [],
  qAnswers: null,
}

const getters = {
  getQuestionList(state) {
    return state.questions;
  }
}

const mutations = {
  setQuestions(state, questions) {
    state.questions = questions;
  },
  setAnswers(state, qAnswers) {
    state.qAnswers = qAnswers;
  }


}

const actions = {
  async getQuestions({commit, rootState}) {
    //There **has** to be a more concise way to do all this....
    const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    const chainIdDec = parseInt(rootState.accounts.chainId);
    const tdAddress = addresses.TruthDisco[chainIdDec];
    const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, provider);
    const questions = await tdContract.getQuestions();
    commit("setQuestions", questions);
  },

  //admin only function
  async createQuestion({ dispatch, rootState }, stimulus) {
    const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    const signer = provider.getSigner();
    const chainIdDec = parseInt(rootState.accounts.chainId);
    const tdAddress = addresses.TruthDisco[chainIdDec];
    const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, signer);
    await tdContract.initQuestion(stimulus);
    dispatch("getQuestions");
  },

  //admin only function
  async processQuestion({ rootState }, qId) {
    const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    const chainIdDec = parseInt(rootState.accounts.chainId);
    const tdAddress = addresses.TruthDisco[chainIdDec];
    const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, provider);
    const tdContractWSigner = new ethers.Contract(tdAddress, TruthDisco.abi, provider.getSigner());

    const encryptedAnswers = await tdContract.getQuestionSubmissions(qId);

    // let answers = [];
    let users = [];
    let reps = [];
    let subs = [];

    for(const ans of encryptedAnswers) {
      // console.log("User address: " + ans.[0]);
      // console.log("Reputation: " + ans.[1]);
      // console.log("Submission: " + ans.[2]);
      const plain = await enc.decrypt(ans.[2], rootState.accounts.providerW3m, addresses.TruthDisco.ownerAddr);
      const dec = JSON.parse(plain);

      if(ethers.utils.verifyMessage(dec.sub, dec.signedSub) === ans.[0]) {
        let rep = ans.[1].toNumber();
      //This must be a new user initialise repuation as 1
        if(rep === 0) {
          rep = 1;
        }
        users.push(ans.[0]);
        reps.push(rep);
        subs.push(dec.sub);
      }
    }

    const rrcAddress = addresses.TruthDisco.repRewCalc;
    const rrcContract = new ethers.Contract(rrcAddress, RepRewCalculator.abi, provider);

    const result = await rrcContract.calculateReward(users, reps, subs);
    console.log(result);

    await tdContractWSigner.processQuestion(qId, result[0], result[1], result[2], result[3]);



    // commit("setAnswers", { qId: qId, answers: encryptedAnswers });
    // await

  },

  /** response - object with .qId and .text **/
  async submitAnswer({ rootState }, response) {

    const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    // console.log
    const signer = provider.getSigner();
    const chainIdDec = parseInt(rootState.accounts.chainId);
    const tdAddress = addresses.TruthDisco[chainIdDec];
    const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, signer);

    const publicKey = addresses.TruthDisco.publicKey;

    const packet = await enc.encrypt(signer, publicKey, response.text);



    /* TODO Response text must be encrypted */
    await tdContract.submitAnswer(response.qId, packet);
    // await tdContract.submitAnswer(response.qId, response.text);

  },






}

const contracts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default contracts;
