const mutations = {
  SOCKET_connect(state) {
    state.isConnected = true;
  },

  SOCKET_disconnect(state) {
    state.isConnected = false;
    state.waiting = false;
  },

  SET_WAITING(state) {
    state.waiting = true;
  },

  RESET_WAITING(state) {
    state.waiting = false;
  },

};

export default mutations;
