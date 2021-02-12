import { updateField } from 'vuex-map-fields';

const mutations = {
  SET_PINS_LIST(state, pins) {
    state.list = pins;
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
