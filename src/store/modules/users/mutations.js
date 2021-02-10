const mutations = {

  // OK
  SET_CURRENT_USER(state, user) {
    console.log('users/SET_CURRENT_USER', user);
    state.currentUser = user;
  },

  // OK
  DESTROY_CURRENT_USER(state) {
    state.currentUser = null;
    state.myEvents = null;
    state.myPin = null;
    state.isAdmin = null;
    console.log('mutation : destroy currentUser');
  },

  // TO BE REWIEWED
  ADD_PIN({ state }, { data }) {
    state.myPin = data;
    // state.currentUser.pinCompleted = true; CHECK???
    console.log('users/ADD_PIN', state.myPin);
  },

  // TO BE REWIEWED
  ADD_EVENT({ state }, { data }) {
    console.log('users/ADD_EVENT', data);
    state.myEvents.push(data);
  },

  // TO BE REWIEWED
  ADD_SUPPORT(state, newSupport) {
    console.log('users/ADD_SUPPORT', newSupport);
    state.topicsSupported.push(newSupport);
  },

  // TEST WITH OBJECT IMPLEMENTATION - NEED DOC { likeId, replyId, userId }
  ADD_LIKE(state, { like }) {
    state.repliesLiked.push(like);
    // console.log('array mylikes', state.repliesLiked);
  },

  // TEST WITH OBJECT IMPLEMENTATION
  REMOVE_LIKE(state, { replyId }) {
    const index = state.repliesLiked.findIndex((el) => el.replyId === replyId);
    if (state.repliesLiked !== null && state.repliesLiked.length !== 0) {
      state.repliesLiked.splice(index, 1);
      // console.log('array mylikes after remove', state.repliesLiked);
    }
  },
};

export default mutations;
