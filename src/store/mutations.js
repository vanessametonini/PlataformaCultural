const mutations = {
  setKey(state, payload) {
    state.newKey = payload;
  },

  SET_NEXT_ROUTE(state, { route }) {
    state.nextRoute = route;
  },
};

export default mutations;
