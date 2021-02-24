import { getField } from 'vuex-map-fields';

function compare(a, b) {
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  return 0;
}

const getters = {
  topicForm(state) {
    const form = { ...state.topicForm };
    form.categoryId = form.categoryId?.id;
    form.categoriesTagged = form.categoriesTagged.map((categorie) => categorie.id);
    return form;
  },
  loadTopics: (state) => state.list,
  loadTopicsFiltered: (state) => {
    let listFiltered = [...state.list];
    switch (state.currentFilter) {
      case 'mostRecent':
        listFiltered = listFiltered.sort((a, b) => compare(a.id, b.id));
        break;
      case 'mostAnswed':
        listFiltered = listFiltered.sort((a, b) => compare(a.numberOfReplies, b.numberOfReplies));
        break;
      case 'mostActive':
        listFiltered = listFiltered.sort((a, b) => compare(a.positiveSupports + a.negativeSupports, b.positiveSupports + b.negativeSupports));
        break;
      default:
        break;
    }
    return listFiltered.filter((topic) => topic.title.search(new RegExp(state.search, 'i')) !== -1);
  },
  getCurrentTopic: (state) => state.currentTopic,
  getCurrentTopicReplyes: (state) => state.currentTopicReplies,
  getField,
};

export default getters;
