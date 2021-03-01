import { updateField } from 'vuex-map-fields';

const mutations = {
  SET_PINS_LIST(state, pins) {
    state.list = pins;
    state.listFiltered = pins;
  },

  ADD_PIN(state, pin) {
    state.list.push(pin);
  },

  UPDATE_CATEGORIES_SELECTEDS(state, categoryId) {
    if (state.selecteds.includes(categoryId)) {
      state.selecteds.splice(state.selecteds.indexOf(categoryId), 1);
    } else {
      state.selecteds.push(categoryId);
    }
    state.listFiltered = [];
    state.selecteds.forEach((id) => {
      state.listFiltered = state.listFiltered.concat(state.list.filter((pin) => pin.categoryId === id));
    });
    if (state.selecteds.length === 0) {
      state.listFiltered = state.list;
    }
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
    state.pinForm = pin;
  },

  updateField,
};

export default mutations;
