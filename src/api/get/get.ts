import axios from 'axios';
import { BASE_URL } from '../const';

export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users`);
  return res.data;
};

export const getWeatherData = async (location: string) => {
  const res = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=J574WMNVW7EN9YU7FGPMDZPA8&contentType=json`
  );

  return res;
};
