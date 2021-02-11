const actions = {
  setNextRoute({ commit }, { route }) {
    commit('SET_NEXT_ROUTE', { route });
  },
  initStore({ dispatch, getters }) {
    dispatch('categories/loadCategories');
    dispatch('pins/loadPins');
    try {
      return dispatch('users/loadUserId', { id: getters['services/decodeToken'].id });
    } catch (error) {
      return error;
    }
  },
};

export default actions;
