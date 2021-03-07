import api from '../../../apiClient';

const actions = {

  loadCategories({ commit, dispatch }) {
    dispatch('services/GET', { uri: 'categories' }, { root: true })
      .then((response) => {
        commit('SET_CATEGORIES', { categories: response.data });
      })
      .catch((error) => error);
  },

  addCategorie({ commit }, { data }) {
    return new Promise((resolve, reject) => {
      api.post('categories', {
        data,
      })
        .then((response) => {
          resolve(response);
          commit('ADD_CATEGORY', { data });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // updateCategory ({ commit }, { categorySlug, data }) {
  //   return categorySlug
  // },

  // deleteCategory ({ commit }, { categorySlug }) {
  //   await apiClient.deleteCategory(categorySlug)
  //   commit('DELETE_CATEGORY', { categorySlug })
  // }

  getCategoryTheme({ state }, id) {
    const index = state.categories.findIndex((item) => item.id === id);
    return state.categories[index];
  },
};

export default actions;
