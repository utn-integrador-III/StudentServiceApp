/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import axios from 'axios';
const ApiManagerStudent = axios.create({
    baseURL: 'http://127.0.0.1:5001',
    responseType: 'json',
    withCredentials: true,
})
export default ApiManagerStudent;
