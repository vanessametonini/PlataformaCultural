import axios from 'axios';

const actions = {
  GET({ state }, { uri, httpConfigs = {} }) {
    return new Promise((resolve, reject) => {
      axios.get(`${state.url}${uri}`, httpConfigs)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  },
};

export default actions;
