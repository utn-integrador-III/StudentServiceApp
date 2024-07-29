/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import axios from 'axios';
const ApiManager = axios.create({
    baseURL: 'http://127.0.0.1:5002',
    responseType: 'json',
    withCredentials: true,
})
export default ApiManager;
