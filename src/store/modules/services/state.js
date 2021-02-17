const state = {
  url: process.env.VUE_APP_BASE_URL,
  supersecret: process.env.VUE_APP_SUPER_SECRET_KEY,
  token: localStorage.getItem('access_token') || '',
  response: {},
  error: {},
  waiting: false,
};

export default state;
