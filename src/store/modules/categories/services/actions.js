const actions = {
  GET({ commit, dispatch }) {
    dispatch('services/GET', { uri: 'categories' }, { root: true })
      .then((response) => {
        commit('success', { response });
        commit('categories/categories', { categories: response.data }, { root: true });
      })
      .catch((error) => commit('error', { error }));
  },
};

export default actions;
