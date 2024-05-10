import axios from 'axios';
import env from '../env';

const post = async (endpoint, payload) => {
  const response = await axios.post(`${env.apiUrl}${endpoint}`, payload);
  return response.data;
};

export { post };
