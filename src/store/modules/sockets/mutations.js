const mutations = {
  SOCKET_connect(state) {
    state.isConnected = true;
  },

  SOCKET_disconnect(state) {
    state.isConnected = false;
  },

  SOCKET_msgToClient(state, message) {
    state.socketMessage = message
  },

  SOCKET_newTopicToClient(state, topic) {
    state.socketMessage = topic
  }
};

export default mutations;
