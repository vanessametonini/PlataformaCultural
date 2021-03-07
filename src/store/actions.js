const actions = {
  setNextRoute({ commit }, { route }) {
    commit('SET_NEXT_ROUTE', { route });
  },
  initStore({ commit, dispatch }) {
    dispatch('categories/loadCategories');
    dispatch('pins/loadPins');
    dispatch('events/loadEvents');
    dispatch('topics/loadTopics');
    dispatch('services/verifyToken')
      .then((response) => {
        dispatch('users/loadCurrentUser', { id: response.id });
        commit('SET_AUTHENTICATION');
      })
      .catch(() => commit('RESET_AUTHENTICATION'));
    // try {
    //   dispatch('topics/loadTopics');
    //   return dispatch('users/loadCurrentUser', { id: getters['services/decodeToken'].id });
    // } catch (error) {
    //   console.log('errrro');
    //   return error;
    // }
  },
};

export default actions;
