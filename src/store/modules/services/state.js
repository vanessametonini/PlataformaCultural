const state = {
  url: 'https://https://cartografiadaculturacg.herokuapp.com/',
  supersecret: process.env.supersecret || 'chavemuitosegura',
  token: localStorage.getItem('access_token') || '',
  response: {},
  error: {},
  waiting: false,
};

export default state;
