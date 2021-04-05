import jwt from 'jsonwebtoken';

const getters = {
  decodeToken: (state) => jwt.verify(state.token, state.supersecret),
  getToken: (state) => state.token,
  getImagePath: (state) => `${state.url}attachment/files/`,
  getDefaultImage: (state) => `${state.url}attachment/files/default.png`,
  getSuperSecretKey: (state) => state.supersecret,
  httpConfigs(state) {
    return {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    };
  },
};

export default getters;
