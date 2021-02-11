import axios from 'axios';

const actions = {
  GET({ state, commit, getters }, { uri, httpConfigs = {} }) {
    // commit('SET_WAITING');
    return new Promise((resolve, reject) => {
      axios.get(`${state.url}${uri}`, { ...httpConfigs, ...getters.httpConfigs })
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
  POST({ state, commit, getters }, { uri, data = {}, httpConfigs = {} }) {
    // commit('SET_WAITING');
    return new Promise((resolve, reject) => {
      axios.post(`${state.url}${uri}`, data, { ...httpConfigs, ...getters.httpConfigs })
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
