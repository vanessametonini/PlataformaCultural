import axios from 'axios';

// const config = {
//   baseURL: 'http://192.168.0.26:4000',
//   timeout: 5000,
//   headers: { Authorization: 'Bearer'.concat(sessionStorage.getItem('access_token')) },
// }

//const axiosInstance = axios.create(config);
const axiosInstance = axios.create();

export default axiosInstance;
