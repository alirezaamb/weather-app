import axios from 'axios';
import { BASE_URL } from '../const';
import { UserType } from '../../types/type';

export const addNewUser = async (data: UserType) => {
  await axios.post(`${BASE_URL}/users`, data);
};
