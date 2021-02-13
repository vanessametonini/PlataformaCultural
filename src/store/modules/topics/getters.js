import { getField } from 'vuex-map-fields';

const getters = {
  topicForm(state) {
    const form = { ...state.topicForm };
    form.categoryId = form.categoryId?.id;
    form.categoriesTagged = form.categoriesTagged.map((categorie) => categorie.id);
    return form;
  },
  loadTopics: (state) => state.list,
  getCurrentTopic: (state) => state.currentTopic,
  getCurrentTopicReplyes: (state) => state.currentTopicReplies,
  getField,
};

export default getters;
