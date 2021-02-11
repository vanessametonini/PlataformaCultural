import jwt from 'jsonwebtoken';

const getters = {
  decodeToken(state) {
    return jwt.verify(state.token, state.supersecret);
  },
};

export default getters;
