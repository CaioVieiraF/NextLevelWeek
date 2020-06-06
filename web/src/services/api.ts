import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3022'
});

export default api;
