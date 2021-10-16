import { ethers } from 'ethers';

import addresses from '../../contracts/addresses.json';

//List contracts here
import TruthDisco from '../../contracts/TruthDisco.json';

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
  async processQuestion({commit, rootState}, qId) {
    console.log(qId)
    const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    const chainIdDec = parseInt(rootState.accounts.chainId);
    const tdAddress = addresses.TruthDisco[chainIdDec];
    const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, provider);

    const answers = await tdContract.checkAnswers(qId);

    commit("setAnswers", { qId: qId, answers: answers });
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

    const publicKey = await rootState.accounts.providerW3m.request({
      method: 'eth_getEncryptionPublicKey',
      params: [addresses.TruthDisco.ownerAddr],
    })

    const packet = await enc.encrypt(signer, publicKey, response.text);


    /* TODO Response text must be encrypted */
    await tdContract.submitAnswer(response.qId, packet);

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
