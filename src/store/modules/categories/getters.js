const getters = {
  loadCategories: (state) => state.categories,
  getCategoryById: (state) => (id) => state.categories.find((category) => category.id === id),
  getCategoryByValue: (state) => (value) => state.categories.find((category) => category.value === value),
};

export default getters;
