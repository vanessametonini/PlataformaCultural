import { Notify } from 'quasar';


const actions = {
  upload({ dispatch }, { file }) {
    var bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return dispatch('services/POST', { uri: 'attachment/files/images', data: bodyFormData, httpConfigs: { headers: { "Content-Type": "multipart/form-data" } } }, { root: true })
      .then((response) => response.data)
      .catch((error) => error);
  },
  async uploadArray({ dispatch }, { files }) {
    const notif = Notify.create({
      group: false,
      spinner: true,
      message: (files.length === 1) ? 'Enviando imagem...' : 'Enviando imagens...',
    })
    const promiseArray = files.map((file) => dispatch('upload', { file: file }));
    try {
      const response = (await Promise.all(promiseArray))
        .map((response) => response[0]);
      notif({
        icon: 'done',
        spinner: false,
        message: files.length === 1 ? 'Imagem enviada!' : 'Imagens enviadas!',
      })
      return response;
    } catch (error) {
      notif({
        type: 'negative',
        spinner: false,
        message: 'Não foi possível enviar sua imagem.',
      })
      return error;
    }
  }
};

export default actions;
