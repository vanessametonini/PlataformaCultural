const mutations = {
  setKey(state, payload) {
    state.newKey = payload;
    console.log('mutations -> state/newKey : _SETKEY');
  },

  SET_NEXT_ROUTE(state, { route }) {
    state.nextRoute = route;
  },
};

export default mutations;
