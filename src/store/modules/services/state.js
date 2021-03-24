const state = {
  url: `${process.env.VUE_APP_BASE_URL || ''}api/`,
  supersecret: process.env.VUE_APP_SUPER_SECRET_KEY || 'chavemuitosegura',
  token: localStorage.getItem('access_token') || '',
  response: {},
  error: {},
  waiting: false,
};

export default state;
