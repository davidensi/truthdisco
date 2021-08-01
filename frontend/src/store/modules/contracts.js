import { ethers } from 'ethers';

import addresses from '../../contracts/addresses.json';

//List contracts here
import Reputations from '../../contracts/Reputations.json';

const state = {
  reputation: 0,
}

const getters = {
  getReputation(state) {
    return state.reputation;
  },


}

const mutations = {
  setReputation(state, reputation) {
    state.reputation = reputation;
  },


}

const actions = {
  // async fetchReputation({commit, rootState}, address, provider) {
  async fetchReputation({commit, rootState}, address) {
    // let provider = rootState.accounts.providerEthers;

    let provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    console.log(provider);
    // let signer = provider.getSigner();
    // console.log(signer);
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let reputationsAddress = addresses.Reputations[chainIdDec];

    let contract = new ethers.Contract(reputationsAddress, Reputations.abi, provider);
    // let reputation = contract.testFunction();
    // var test = await contract.testFunction();
    let reputation = await contract.reputationOf(address);
    // console.log(contract)
    console.log(reputation);
    commit("setReputation", reputation);
  },




  async setReputation({commit, rootState}, payload) {
    let address = payload.address;
    let value = payload.value;
    console.log(value)
    let bnValue = ethers.BigNumber.from(value);
    console.log(bnValue)
    let provider = new ethers.providers.Web3Provider(rootState.accounts.providerW3m)
    let signer = provider.getSigner();
    console.log(signer)
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let reputationsAddress = addresses.Reputations[chainIdDec];

    let contract = new ethers.Contract(reputationsAddress, Reputations.abi, signer);

    await contract.updateReputation(address, bnValue);
    let reputation = await contract.reputationOf(address);
    console.log(reputation);
    commit("setReputation", reputation);


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
