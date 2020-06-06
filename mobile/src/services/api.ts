import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.123:3022'
});

export default api;
