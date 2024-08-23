// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Substitua pela URL da sua API

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/endpoint`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
