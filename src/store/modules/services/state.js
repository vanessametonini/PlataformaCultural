const state = {
  url: 'http://localhost:4000/',
  supersecret: process.env.supersecret || 'chavemuitosegura',
  token: localStorage.getItem('access_token') || '',
  response: {},
  error: {},
  waiting: false,
  httpConfigs: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  },
};

export default state;
