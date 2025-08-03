// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Change this if your backend is deployed
});

export default instance;
