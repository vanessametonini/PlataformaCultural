import jwt from 'jsonwebtoken';

const getters = {
  decodeToken: (state) => jwt.verify(state.token, state.supersecret),
};

export default getters;
