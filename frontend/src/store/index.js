import { createStore } from 'vuex';

import accounts from './modules/accounts';
import contracts from './modules/contracts';

const store = createStore({
  modules: {
    accounts,
    contracts
  }
});

export default store;
