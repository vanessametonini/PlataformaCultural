const mutations = {
  SUCCESS(state, { response }) {
    state.response = response;
  },
  ERROR(state, { error }) {
    state.error = error;
  },
  SET_WAITING(state) {
    state.waiting = true;
  },
  RESET_WAITING(state) {
    state.waiting = false;
  },
};

export default mutations;
