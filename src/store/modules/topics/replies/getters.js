import { getField } from 'vuex-map-fields';

const getters = {
  getCurrentTopicReplyes: (state) => state.currentTopicReplies,
  getField,
};

export default getters;
