const mutations = {
  SET_PINS_LIST(state, { data }) {
    state.list = data;
  },

  ADD_NEW_PIN(state, { pins }) {
    state.list = pins;
  },

  DELETE_PIN_BY_ID(state, { data }) {
    const index = state.list.findIndex((el) => el.id === data.id);
    state.list.splice(index, 1);

    // delete markers too
  },

  UPDATE_PIN_BY_ID(state, { newData }) {
    const index = state.list.findIndex((el) => el.id === newData.id);
    state.list[index] = newData.body;
  },
};

export default mutations;
