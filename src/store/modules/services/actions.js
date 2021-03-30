import axios from 'axios';
import jwt from 'jsonwebtoken';

const actions = {
  verifyToken({ getters }) {
    return new Promise((resolve, reject) => {
      jwt.verify(getters.getToken, getters.getSuperSecretKey, (err, decode) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(decode);
      });
    });
  },

  GET({ state, commit, getters }, { uri, httpConfigs = {} }) {
    // commit('SET_WAITING');
    return new Promise((resolve, reject) => {
      axios.get(`${state.url}${uri}`, { ...httpConfigs, ...getters.httpConfigs })
        .then((response) => {
          // commit('SUCCESS', { response });
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
      axios.post(`${state.url}${uri}`, data, { headers: {...httpConfigs.headers, ...getters.httpConfigs.headers } })
        .then((response) => {
          // commit('SUCCESS', { response });
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
  DELETE({ state, commit, getters }, { uri, httpConfigs = {} }) {
    // commit('SET_WAITING');
    return new Promise((resolve, reject) => {
      axios.delete(`${state.url}${uri}`, { ...httpConfigs, ...getters.httpConfigs })
        .then((response) => {
          // commit('SUCCESS', { response });
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
