import jwt from 'jsonwebtoken';

const getters = {
  decodeToken: (state) => jwt.verify(state.token, state.supersecret),
  getToken: (state) => state.token,
  getImagePath: (state) => `${state.url}images/`,
  getDefaultImage: (state) => `${state.url}images/default.png`,
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
