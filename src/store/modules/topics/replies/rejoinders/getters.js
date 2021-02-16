import { getField } from 'vuex-map-fields';

const GETTERS = {
  getCurrentTopicRejoinders: (state) => state.currentTopicRejoinders,
  getMyRejoindersCurrentTopicByReplyId: (state) => (replyId) => state.currentTopicRejoinders.filter((rejoinder) => rejoinder.replyId === replyId),
  getRejoinderFormByReplyId: (state) => (replyId) => state.currentTopicRejoindersForm.filter((form) => form.replyId === replyId)[0]?.content,
  getField,
};

export default GETTERS;
