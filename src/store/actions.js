import { event } from 'vue-analytics'

const actions = {
  setNextRoute({ commit }, { route }) {
    commit('SET_NEXT_ROUTE', { route });
  },
  initStore({ commit, dispatch }) {
    event('user-enter', 'increase', 'counter')
    dispatch('categories/loadCategories');
    dispatch('pins/loadPins');
    dispatch('events/loadEvents');
    dispatch('topics/loadTopics');
    dispatch('services/verifyToken')
      .then((response) => {
        if (JSON.parse(JSON.stringify(response)).name === 'Error'){
          commit('RESET_AUTHENTICATION')
        } else {
          commit('SET_AUTHENTICATION');
          dispatch('users/loadCurrentUser', { id: response.data });
        }
      })
      .catch(() => commit('RESET_AUTHENTICATION'));
  },
};

export default actions;
