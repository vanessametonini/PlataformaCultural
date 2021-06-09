import { Notify } from 'quasar';

const actions = {
  loadPins({ commit, dispatch }) {
    dispatch('services/GET', { uri: 'pins' }, { root: true })
      .then((response) => {
        commit('SET_PINS_LIST', response.data);
      })
      .catch((error) => error);
  },

  loadMyPin({ commit, dispatch, rootState }) {
    dispatch('services/GET', { uri: `pins/${rootState.users.currentUser.id}` }, { root: true })
      .then((response) => {
        commit('users/ADD_PIN', response.data, { root: true });
        commit('ADD_CURRENT_PIN', response.data);
      })
      .catch((error) => error);
  },

  animatePin({ commit, rootGetters }, { $router, pin }) {
    $router.push({ name: 'Home' });
    const newPosition = [pin.lat+0.02, pin.long];
    const oldPosition = { ...rootGetters['maps/getCenter'] };
    const dx = (newPosition[0] - oldPosition.lat);
    const dy = (newPosition[1] - oldPosition.lng);
    let i = 0;
    const interval = setInterval(() => {
      commit('maps/TRANSLATE_MAP_CENTER', [oldPosition.lat + (dx * i) / 100, oldPosition.lng + (dy * i) / 100], { root: true });
      if (i === 100) clearInterval(interval);
      i += 1;
    }, 3);
    commit('ADD_SELECTED_CATEGORY', pin.categoryId);

    commit('SET_SELECTED_PIN_ID', pin.id);
  },

  postPin({ commit, dispatch, rootState }, { $router }) {
    const notif = Notify.create({
      group: false,
      spinner: true,
      message: 'Cadastrando pin...',
    });
    const data = { ...rootState.pins.pinForm, userId: rootState.users.currentUser.id };
    return dispatch('services/POST', { uri: 'pins', data }, { root: true })
      .then((response) => {
        const pin =  { ...data, ...response.data };
        commit('ADD_PIN', pin );
        notif({
          icon: 'done',
          spinner: false,
          message: 'Pin cadastrado!',
        })
        dispatch('animatePin', {  $router, pin });
        return response;
      })
      .catch((error) => {
        notif({
          type: 'negative',
          spinner: false,
          message: 'Não foi possível cadastrar seu pin.',
        })
        return error;
      });
  },

  putPin({ commit, dispatch, rootState }, { $router }) {
    const notif = Notify.create({
      group: false,
      spinner: true,
      message: 'Atualizando pin...',
    });
    const data = { ...rootState.pins.pinForm, userId: rootState.users.currentUser.id };
    return dispatch('services/PUT', { uri: `pins/${rootState.pins.selectedPinId}`, data }, { root: true })
      .then((response) => {
        const pin =  { ...data, ...response.data };
        commit('UPDATE_PIN', pin );
        notif({
          icon: 'done',
          spinner: false,
          message: 'Pin atualizado!',
        })
        dispatch('animatePin', {  $router, pin });
        return response;
      })
      .catch((error) => {
        notif({
          type: 'negative',
          spinner: false,
          message: 'Não foi possível atualizar seu pin.',
        })
        return error;
      });
  },
};

export default actions;
