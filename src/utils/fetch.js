import axios from "axios";
import { config } from '../config';

export const fetchApi = (id) => {
  return axios.get(`${config.api_url}/${id ? `${id}/` : ''}`)
};
