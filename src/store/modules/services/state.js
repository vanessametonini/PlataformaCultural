const state = {
  url: 'https://polar-sierra-18297.herokuapp.com//',
  supersecret: process.env.supersecret || 'chavemuitosegura',
  token: localStorage.getItem('access_token') || '',
  response: {},
  error: {},
  waiting: false,
};

export default state;
