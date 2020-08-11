import api from '../../apiClient';

export default {
  namespaced: true,
  state: {
    categories: [
      {
        label: 'Dança, Teatro e Circo',
        value: '1',
        color: '#683931',
      },
      {
        label: 'Escultura',
        value: '2',
        color: '#AD3B3B',
      },
      {
        label: 'Arte Urbana',
        value: '3',
        color: '#C95B40',
      },
      {
        label: 'Arte Digital',
        value: '4',
        color: '#DBB753',
      },
      {
        label: 'Cultura Popular',
        value: '5',
        color: '#E6B545',
      },
      {
        label: 'Museologia',
        value: '6',
        color: '#529E63',
      },
      {
        label: 'Artesanato',
        value: '7',
        color: '#49833A',
      },
      {
        label: 'Fotografia',
        value: '8',
        color: '#254C26',
      },
      {
        label: 'Literatura',
        value: '9',
        color: '#2F5497',
      },
      {
        label: 'Cinema e AudioVisual',
        value: '10',
        color: '#4692C1',
      },
      {
        label: 'Cultura e Representação',
        value: '11',
        color: '#86BCD3',
      },
      {
        label: 'Música',
        value: '12',
        color: '#D3869B',
      },
      {
        label: 'Folclore',
        value: '13',
        color: '#CB6883',
      },
      {
        label: 'Gastronomia',
        value: '14',
        color: '#C44B6E',
      },
      {
        label: 'Moda',
        value: '15',
        color: '#BD6A5C',
      },
      {
        label: 'Produtor Cultural',
        value: '16',
        color: '#AD3B3B',
      },
      {
        label: 'Estabelecimento',
        value: '17',
        color: '#653830',
      },
      {
        label: 'Instituição',
        value: '18',
        color: '#C95B40',
      },
    ],
    current: {},
  },

  getters: {
    loadCategories: (state) => state.categories,
  },

  // **** apenas admin tem essa permissão -----------------------

  actions: {
    loadCategories({ commit }) {
      return new Promise((resolve, reject) => {
        api.get('categories')
          .then((response) => {
            console.log('response add categorie', response);
            const categories = response.data;
            commit('SET_CATEGORIES', { categories });
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    addCategorie({ commit }, { data }) {
      return new Promise((resolve, reject) => {
        api.post('categories', {
          data,
        })
          .then((response) => {
            console.log('response add categorie', response);
            resolve(response);
            commit('ADD_CATEGORY', { data });
          })
          .catch((error) => {
            console.log(error);
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
  },

  // mutations: {
  //   ADD_CATEGORY(state, { newCategories }) {
  //     state.all = categories
  //   },

  // DELETE_CATEGORY({ state }, id) {
  //   console.log('DEL_CATEGORY:', id);
  //   state.categories.splice(id, 1);
  // },

  // **** fim de ações de admin ---------------------------------

  //   SET_CURRENT_CATEGORY(state, { category }) {
  //     state.current = category
  //   },
  // }
};
