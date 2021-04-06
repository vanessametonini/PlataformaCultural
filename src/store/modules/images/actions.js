const actions = {
  upload({ dispatch }, { file }) {
    var bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return dispatch('services/POST', { uri: 'attachment/files/images', data: bodyFormData, httpConfigs: { headers: { "Content-Type": "multipart/form-data" }}}, { root: true })
      .then((response) => response.data)
      .catch((error) => error);
  },
  // upload({ dispatch }, { file }) {
  //   var bodyFormData = new FormData();
  //   bodyFormData.append('file', file);
  //   return dispatch('services/POST', { uri: 'images', data: bodyFormData, httpConfigs: { headers: { "Content-Type": "multipart/form-data" }}}, { root: true })
  //     .then((response) => response.data)
  //     .catch((error) => error);
  // },
  async uploadArray({ dispatch }, { files }){
    const promiseArray = files.map((file) => dispatch('upload', { file: file }));
    try {
      return (await Promise.all(promiseArray))
        .map((response) => response[0] );
    } catch(error) {
      console.error(error)
    }
  }
};

export default actions;
