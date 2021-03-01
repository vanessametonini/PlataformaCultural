const actions = {
  loadPins({ commit, dispatch }) {
    dispatch('services/GET', { uri: 'pins' }, { root: true })
      .then((response) => {
        commit('SET_PINS_LIST', response.data);
        // commit('SET_PINS_LIST_FILTERED', response.data);
      })
      .catch((error) => error);
  },

  loadMyPin({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `pins/${rootState.users.currentUser.id}` }, { root: true })
      .then((response) => {
        commit('users/ADD_PIN', response.data, { root: true });
        commit('ADD_CURRENT_PIN', response.data);
      })
      .catch((error) => error);
  },

  postPin({ commit, dispatch, rootState }) {
    const data = {
      ...rootState.pins.pinForm,
      userId: rootState.users.currentUser.id,
    };
    dispatch('services/POST', { uri: 'pins', data }, { root: true })
      .then((response) => {
        commit('ADD_PIN', { ...data, ...response.data });
        console.log(response);
        return response;
      })
      .catch((error) => console.log(error));
  },
};

export default actions;
