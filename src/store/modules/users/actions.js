import { Notify } from 'quasar';

const actions = {

  sendEmailRecover({ state, dispatch }) {
    const notif = Notify.create({
      group: false,
      spinner: true,
      message: 'Enviando email de recuperação...',
    });
    dispatch('services/POST', { uri: 'auth/send-recover-email', data: { email: state.emailRecover } }, { root: true })
      .then((response) => {
        notif({
          icon: 'done',
          spinner: false,
          message: 'Email de recuperação enviado!',
        })
        return response;
      })
      .catch((error) => {
        notif({
          type: 'negative',
          spinner: false,
          message: 'Não foi possível enviar um email de confirmação.',
        })
        return error;
      });
  },

  confirmEmail({ dispatch }, { confirmToken }) {
    const notif = Notify.create({
      group: false,
      spinner: true,
      message: 'Confirmando seu email...',
    });
    return dispatch('services/GET', { uri: `auth/confirm/${confirmToken}` }, { root: true })
      .then((response) => {
        notif({
          icon: 'done',
          spinner: false,
          message: `Email confirmado! Bem vind${response.data.user.gender === 'Feminino' ? 'a' : 'o'}!`,
        })
        return response;
      })
      .catch((error) => {
        notif({
          type: 'negative',
          spinner: false,
          message: 'Não foi possível confirmar seu email.',
        })
        return error;
      });
  },


  resetPassword({ state, dispatch }, { token }) {
    const notif = Notify.create({
      group: false,
      spinner: true,
      message: 'Enviando email de recuperação...',
    });
    dispatch('services/POST', { uri: `auth/reset-password/${token}`, data: state.resetPassword }, { root: true })
      .then((response) => {
        notif({
          icon: 'done',
          spinner: false,
          message: 'Email de recuperação enviado!',
        })
        Notify.create({
          message: 'Enviamos um email de confirmação.',
        });
        Notify.create({
          message: 'Confira sua caixa de entrada.',
        });
        return response;
      })
      .catch((error) => {
        notif({
          type: 'negative',
          spinner: false,
          message: 'Não foi possível enviar um email de recuperação.',
        })
        return error;
      });
  },

  signUp({ getters, dispatch }, { file }) {
    const notif1 = Notify.create({
      group: false,
      spinner: true,
      message: 'Estamos cadastrando seu perfil..',
      position: 'top-right',
    });
    dispatch('services/POST', { uri: 'auth/signup', data: getters.getSignUpForm }, { root: true })
      .then(async (response) => {

        if(file) {
          const notif2 = Notify.create({
            group: false,
            spinner: true,
            message: 'Enviando avatar...',
            position: 'top-right',
          });

          await dispatch('images/uploadAvatar', { file, userId: response.data.id }, { root: true })
            .then((response) => {
              notif2({
                icon: 'done',
                spinner: false,
                message: 'Avatar enviado!',
                position: 'top-right',
              })
            })
            .catch((error) => {
              notif2({
                type: 'negative',
                spinner: false,
                message: 'Não foi possível enviar seu avatar!',
                position: 'top-right',
              })
              return error;
            });
        }

        notif1({
          icon: 'done',
          spinner: false,
          message: 'Perfil cadastrado!',
          position: 'top-right',
        })
        Notify.create({
          message: 'Enviamos um email de confirmação!',
          position: 'top-right',
        });
        Notify.create({
          message: 'Verifique sua caixa de entrada!',
          position: 'top-right',
        });

        return response;
      })
      .catch((error) => {
        if(error.response.data.statusCode === 409)
          Notify.create({
            message: 'Este email já está cadastrado.',
            position: 'top-right',
          });
        notif1({
          type: 'negative',
          spinner: false,
          message: 'Não foi possível cadastrar seu perfil.',
          position: 'top-right',
        })
        return error;
      });
  },

  retrieveToken({ commit, dispatch }, { credentials }) {
    const notif = Notify.create({
      group: false,
      spinner: true,
      message: 'Estamos confirmando suas credenciais...',
    });
    return new Promise((resolve, reject) => {
      dispatch('services/POST', { uri: 'auth/login', data: credentials }, { root: true })
        .then(async (response) => {
          const user = response.data.user
          if (user.confirmToken === null) {
            commit('SET_AUTHENTICATION', {}, { root: true });
            commit('services/STORAGE_TOKEN', response.data.token, { root: true });
            await dispatch('initStore', {}, { root: true })
          }
          notif({
            icon: 'done',
            spinner: false,
            message: `Credenciais confirmadas! Bem vind${user.gender === 'Feminino' ? 'a' : 'o'}!`,
          })
          resolve(response);
        })
        .catch((error) => {
          notif({
            type: 'negative',
            spinner: false,
            message: 'Não possível confirmar suas credenciais.',
          })
          reject(error);
        });
    });
  },

  loadCurrentUser({ commit, dispatch }, { id }) {
    return new Promise((resolve, reject) => {
      dispatch('services/GET', { uri: `users/${id}` }, { root: true })
        .then((response) => {
          commit('SET_CURRENT_USER', response.data);
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  },

  async loadUserId({ dispatch }, { id }) {
    return dispatch('services/GET', { uri: `users/${id}` }, { root: true })
      .then((response) => response.data)
      .catch((error) => error);
  },

  destroyToken({ commit }) {
    localStorage.removeItem('access_token');
    commit('DESTROY_CURRENT_USER');
    commit('RESET_AUTHENTICATION', {}, { root: true });
  },

  likeReply({ state, commit, dispatch }, { replyId }) {
    const likeId = state.key;
    const like = { likeId, replyId, userId: state.currentUser.id };
    commit('ADD_LIKE', { like });
  },

  unlikeReply({ commit, dispatch }, { replyId }) {
    dispatch('topics/decrementLikeInReply', { replyId }, { root: true });
    commit('REMOVE_LIKE', { replyId });
  },

  supportThis({ dispatch, commit }, { topicId, supportType }) {
    const newSupport = { topicId, supportType };
    dispatch('topics/supportCurrentTopic', { supportType }, { root: true });
    commit('ADD_SUPPORT', newSupport);
  },
};

export default actions;
