import jwt from 'jsonwebtoken';

const getters = {
  decodeToken: (state) => jwt.verify(state.token, state.supersecret),
  getToken: (state) => state.token,
  getImagePath: (state) => `${state.url}images/`,
  getDefaultImage: (state) => `${state.url}images/eb1d9a0ef3c078316330e6a4af53b8a6.png`,
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
