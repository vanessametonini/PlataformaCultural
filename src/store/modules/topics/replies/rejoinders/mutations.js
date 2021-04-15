import { updateField } from 'vuex-map-fields';

const mutations = {
  // OK
  SET_CURRENT_TOPIC_REJOINDERS(state, data) {
    state.currentTopicRejoinders = data;
  },
  INIT_CURRENT_TOPIC_REJOINDERS_FORM(state, data) {
    let i = 0;
    for (i; i < data.length; i += 1) {
      state.currentTopicRejoindersForm.push({
        content: '',
        replyId: data[i].id,
      });
    }
  },

  SET_REJOINDER_FORM_BY_REPLY_ID(state, data) {
    state.currentTopicRejoindersForm = state.currentTopicRejoindersForm.map((form) => {
      if (data.replyId === form.replyId) {
        return data;
      }
      return form;
    });
  },

  ADD_CURRENT_TOPIC_REPLY_REJOINDER(state, data) {
    state.currentTopicRejoinders.push(data);
  },

  ADD_CURRENT_TOPIC_REPLY_REJOINDER_FORM(state, data) {
    state.currentTopicRejoindersForm.push(data);
  },

  REMOVE_REJOINDER_ID(state, id){
    state.currentTopicRejoinders = state.currentTopicRejoinders.filter((rejoinder) => rejoinder.id !== id )
  },

  updateField,
};

export default mutations;
