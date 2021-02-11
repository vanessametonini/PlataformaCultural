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
  STORAGE_TOKEN(state, token) {
    localStorage.setItem('access_token', token);
    state.token = token;
  },
};

export default mutations;
