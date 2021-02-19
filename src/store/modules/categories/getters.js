const getters = {
  loadCategories: (state) => state.categories,
  getCategoryById: (state) => (id) => state.categories.find((category) => category.id === id),
};

export default getters;
