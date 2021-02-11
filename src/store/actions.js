const actions = {
  setNextRoute({ commit }, { route }) {
    commit('SET_NEXT_ROUTE', { route });
  },
};

export default actions;
