const state = {
  url: `${process.env.VUE_APP_BASE_URL}api/`,
  token: localStorage.getItem('access_token') || '',
  response: {},
  error: {},
  waiting: false,
};

export default state;
