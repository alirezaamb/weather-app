import axios from 'axios';
import { BASE_URL } from '../const';

export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};
