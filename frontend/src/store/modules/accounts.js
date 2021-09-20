import Web3Modal from 'web3modal';
import { ethers } from 'ethers';


const state = {
  activeAccount: null,
  activeBalance: 0,
  chainId: null,
  chainName: null,
  providerEthers: null,
  isConnected: false,
  providerW3m: null,
  web3Modal: null
};

// Getters
const getters = {
  getActiveAccount(state) {
    return state.activeAccount;
  },
  getActiveBalance(state) {
    return state.activeBalance;
  },
  getChainId(state) {
    return state.chainId;
  },
  getChainName(state) {
    return state.chainName;
  },
  getProviderEthers(state) {
    return state.providerEthers;
  },
  getW3Modal(state) {
    return state.web3Modal;
  },
  isUserConnected(state) {
    return state.isConnected;
  }
}

// Mutations
const mutations = {

  async disconnectWallet(state) {
    state.activeAccount = null;
    state.activeBalance = 0;
    state.providerEthers = null;
    if(state.providerW3m.close && state.providerW3m != null) {
      await state.providerW3m.close();
    }
    state.providerW3m = null;
    await state.web3Modal.clearCachedProvider();

    window.location.href = '../';
  },

  setActiveAccount(state, address) {
    state.activeAccount = address;
  },

  setActiveBalance(state, balance) {
    state.activeBalance = balance
  },
  setChainData(state, chainId) {
    state.chainId = chainId;

    switch(chainId) {
      default:
        state.chainName = "Localhost";
        break;
    }
  },

  async setEthersProvider(state, providerW3m) {
    state.providerW3m = providerW3m;
    state.providerEthers = new ethers.providers.Web3Provider(providerW3m);
  },
  setIsConnected(state, isConnected) {
    state.isConnected = isConnected;
    localStorage.setItem('isConnected', isConnected);
  },
  setWeb3ModalInstance(state, w3Modal) {
    state.web3Modal = w3Modal;
  }


};

//Actions
const actions = {

  async initWeb3Modal({ commit }) {

    const providerOptions = {
      // This is empty, because only MetaMask is
      // required and enabled by default
    }

    const w3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions
    });

    if(localStorage.getItem('isConnected') === 'true') {
      let providerW3m = await w3Modal.connect();
      commit("setIsConnected", true);

      commit("setActiveAccount", window.ethereum.selectedAddress);
      commit("setChainData", window.ethereum.chainId);
      commit("setEthersProvider", providerW3m);
      actions.fetchActiveBalance({ commit });
    }

    commit("setWeb3ModalInstance", w3Modal);

  },

  async connectWeb3Modal({ commit }) {
    let providerW3m = await state.web3Modal.connect();
    commit("setIsConnected", true);

    commit("setActiveAccount", window.ethereum.selectedAddress);
    commit("setChainData", window.ethereum.chainId);
    commit("setEthersProvider", providerW3m);
    actions.fetchActiveBalance({ commit });

  },

  async disconnectWeb3Modal({ commit }) {
    commit("disconnectWallet");
    commit("setIsConnected", false);
  },

  async ethereumListener({ commit }) {

    window.ethereum.on("accountsChanged", (accounts) => {
      if(state.isConnected) {
        commit("setActiveAccount", accounts[0]);
        commit("setEthersProvider", state.providerW3m);
        actions.fetchActiveBalance({ commit });
      }
    });

    window.ethereum.on("chainChanged", (chainId) => {
      commit("setChainData", chainId);
      commit("setEthersProvider", state.providerW3m);
      actions.fetchActiveBalance({ commit });
    });

  },

  async fetchActiveBalance({ commit }) {
    let balance = await state.providerEthers.getBalance(state.activeAccount);
    commit("setActiveBalance", balance);
  }


}

const accounts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}


console.log("hello from store/accounts");
export default accounts;
