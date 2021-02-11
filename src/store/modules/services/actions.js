import axios from 'axios';

const actions = {
  GET({ state, commit }, { uri }) {
    // commit('SET_WAITING');
    return new Promise((resolve, reject) => {
      axios.get(`${state.url}${uri}`, state.httpConfigs)
        .then((response) => {
          commit('SUCCESS', { response });
          // commit('RESET_WAITING');
          resolve(response);
        })
        .catch((error) => {
          commit('ERROR', { error });
          // commit('RESET_WAITING');
          reject(error);
        });
    });
  },
  POST({ state, commit }, { uri, data = {} }) {
    // commit('SET_WAITING');
    return new Promise((resolve, reject) => {
      axios.post(`${state.url}${uri}`, data, state.httpConfigs)
        .then((response) => {
          commit('SUCCESS', { response });
          // commit('RESET_WAITING');
          resolve(response);
        })
        .catch((error) => {
          commit('ERROR', { error });
          // commit('RESET_WAITING');
          reject(error);
        });
    });
  },
};

export default actions;
