import { updateField } from 'vuex-map-fields';

const mutations = {
  SET_PINS_LIST(state, pins) {
    state.list = pins;
  },

  SET_PINS_LIST_FILTERED(state, pins) {
    state.listFiltered = pins;
  },

  UPDATE_PIN_LIST_FILTERED_BY_ARRAY_CATEGORY_VALUE(state, array) {
    state.listFiltered = [];
    array.forEach((categoryId) => {
      state.listFiltered = state.listFiltered.concat(state.list.filter((pin) => pin.categoryId === categoryId));
    });
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

  ADD_CURRENT_PIN(state, pin) {
    state.currentPin = pin;
  },

  updateField,
};

export default mutations;
