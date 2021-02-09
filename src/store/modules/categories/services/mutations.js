const mutations = {
  error(state, { error }) {
    state.error = error;
  },
  success(state, { response }) {
    state.success = response;
  },
};

export default mutations;
