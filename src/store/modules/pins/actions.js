const actions = {
  loadPins({ commit, dispatch }) {
    dispatch('services/GET', { uri: 'pins' }, { root: true })
      .then((response) => {
        commit('SET_PINS_LIST', response.data);
        commit('SET_PINS_LIST_FILTERED', response.data);
      })
      .catch((error) => console.log(error));
  },

  loadMyPin({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `pins/${rootState.users.currentUser.id}` }, { root: true })
      .then((response) => {
        commit('users/ADD_PIN', response.data, { root: true });
        commit('ADD_CURRENT_PIN', response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  },

  updateMyPin({ dispatch, rootState }) {
    return new Promise((resolve, reject) => {
      const params = {
        userId: rootState.users.currentUser.id,
        categoryId: rootState.users.currentUser.categoryId,
      };
      dispatch('services/POST', { uri: 'pins', data: { ...rootState.pins.currentPin, ...params } }, { root: true })
        .then((response) => {
          dispatch('loadPins');
          dispatch('loadMyPin');
          resolve(response);
        })
        .catch((error) => {
          console.log(error.message);
          reject(error);
        });
    });
  },
};

export default actions;
