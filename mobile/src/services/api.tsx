import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.91:3001'
});

export default api;
