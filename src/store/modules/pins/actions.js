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

  postPin({
    commit,
    dispatch,
    rootState,
    rootGetters,
  }, { $router }) {
    const data = {
      ...rootState.pins.pinForm,
      userId: rootState.users.currentUser.id,
    };
    dispatch('services/POST', { uri: 'pins', data }, { root: true })
      .then((response) => {
        commit('ADD_PIN', { ...data, ...response.data });
        commit('SET_SELECTED_PIN_ID', response.data.id);
        commit('ADD_SELECTED_CATEGORY', data.categoryId);
        $router.push({ name: 'Home' });
        const newPosition = [response.data.lat, response.data.long];
        const oldPosition = { ...rootGetters['maps/getCenter'] };
        const dx = (newPosition[0] - oldPosition.lat);
        const dy = (newPosition[1] - oldPosition.lng);
        let i = 0;
        const interval = setInterval(() => {
          commit('maps/TRANSLATE_MAP_CENTER', [oldPosition.lat + (dx * i) / 100, oldPosition.lng + (dy * i) / 100], { root: true });
          if (i === 100) {
            clearInterval(interval);
          }
          i += 1;
        }, 3);
        return response;
      })
      .catch((error) => console.log(error));
  },
};

export default actions;
