import { ethers } from 'ethers';

import addresses from '../../contracts/addresses.json';

//List contracts here
import TruthDisco from '../../contracts/TruthDisco.json';

const state = {
  questions: [],
  focusedQuestion: null,
}

const getters = {
  getQuestionList(state) {
    return state.questions;
  }
}

const mutations = {
  setQuestions(state, ownerAddr) {
    state.questions = ownerAddr;
  },
  setFocussed(state, question) {
    state.focusedQuestion = question;
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
    // await tdContract.getQuestions().wait();
      // .catch(console.error)
      // .then((questions) => {
        commit("setQuestions", questions);
      // })
      // commit("setQuestions", questions);
  },

  //admin only function
  async createQuestion({ dispatch, rootState }, stimulus) {
    const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    const signer = provider.getSigner();
    const chainIdDec = parseInt(rootState.accounts.chainId);
    const tdAddress = addresses.TruthDisco[chainIdDec];
    const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, signer);
    await tdContract.initQuestion(stimulus);

    //getQuestions - needs to manually update at the moment
    //get the store to update - once the transaction is complete
    // const state
    // window.ethereum.on("message", (message) => {
      // console.log(message);
    dispatch("getQuestions");
    // });
  },

  // async fetchQuestion({ commit , rootState }, qId) {
  //   const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
  //   const chainIdDec = parseInt(rootState.accounts.chainId);
  //   const tdAddress = addresses.TruthDisco[chainIdDec];
  //   const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, provider);
  //   const question = await tdContract.fetchQuestion(qId);
  //
  //   commit("setFocussed", question);
  // },

  async submitAnswer({ rootState }, response) {
    const provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    const signer = provider.getSigner();
    const chainIdDec = parseInt(rootState.accounts.chainId);
    const tdAddress = addresses.TruthDisco[chainIdDec];
    const tdContract = new ethers.Contract(tdAddress, TruthDisco.abi, signer);
    await tdContract.submitAnswer(response.qId, response.text);

  }






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
