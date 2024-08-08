/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import axios from 'axios';
const ApiManagerStudent = axios.create({
    baseURL: 'http://10.0.2.2:5001',
    responseType: 'json',
    withCredentials: true,
})
export default ApiManagerStudent;
