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
    console.log("trace")
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
  async processQuestion({ commit, rootState }, qId) {
    const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    const chainIdDec = parseInt(rootState.accounts.chainId);
    const tdAddress = addresses.TruthDisco[chainIdDec];
    const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, provider);

    const encryptedAnswers = await tdContract.getQuestionSubmissions(qId);

    // let answers = [];
    let users = [];
    let reps = [];
    let subs = [];

    for(const ans of encryptedAnswers) {
      console.log("User address: " + ans.[0]);
      console.log("Reputation: " + ans.[1]);
      console.log("Submission: " + ans.[2]);
      let plain = await enc.decrypt(ans.[2], rootState.accounts.providerW3m, addresses.TruthDisco.ownerAddr);
      let rep = ans.[1].toNumber();
      //This must be a new user initialise repuation as 1
      if(rep === 0) {
        rep = 1;
      }
      users.push(ans.[0]);
      reps.push(rep);
      subs.push(plain);

      // answers.push({
      //   user: ans.[0],
      //   reputation: rep,
      //   submission: plain,
      // })
    }

    const rrcAddress = addresses.TruthDisco.repRewCalc;
    const rrcContract = new ethers.Contract(rrcAddress, RepRewCalculator.abi, provider);
    console.log(rrcContract);

    await rrcContract.calculateReward(users, reps, subs);



    commit("setAnswers", { qId: qId, answers: encryptedAnswers });
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

    //*****The following fours line request the publickey from metamask-
    //*****This is now done at deployment and uploaded.
    // const publicKey = await rootState.accounts.providerW3m.request({
    //   method: 'eth_getEncryptionPublicKey',
    //   params: [addresses.TruthDisco.ownerAddr],
    // })
    // console.log(publicKey);
    const publicKey = addresses.TruthDisco.publicKey;

    const packet = await enc.encrypt(signer, publicKey, response.text);

    //**This is how the decryption is done - from admin account
    // const dec = await rootState.accounts.providerW3m.request({
    //   method: 'eth_decrypt',
    //   params: [packet, addresses.TruthDisco.ownerAddr],
    // })
    // console.log(dec);



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

console.log("hello from store/contracts")
export default contracts;
