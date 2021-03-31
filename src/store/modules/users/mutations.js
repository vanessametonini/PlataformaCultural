import { updateField } from 'vuex-map-fields';

const mutations = {
  updateField,
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
    state.userForm = user
  },
  DESTROY_CURRENT_USER(state) {
    state.currentUser = null;
    state.myEvents = null;
    state.myPin = null;
    state.isAdmin = null;
  },
  ADD_PIN(state, data) {
    state.myPin = data;
  },
  ADD_EVENT({ state }, { data }) {
    state.myEvents.push(data);
  },
  ADD_SUPPORT(state, newSupport) {
    state.topicsSupported.push(newSupport);
  },
  ADD_LIKE(state, { like }) {
    state.repliesLiked.push(like);
  },
  REMOVE_LIKE(state, { replyId }) {
    const index = state.repliesLiked.findIndex((el) => el.replyId === replyId);
    if (state.repliesLiked !== null && state.repliesLiked.length !== 0) {
      state.repliesLiked.splice(index, 1);
    }
  },
};

export default mutations;
