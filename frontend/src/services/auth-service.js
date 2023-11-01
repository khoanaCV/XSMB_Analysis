import authHeader from './auth-header';
import axios from "axios";
const API_URL = "http://localhost:8080/api/mod/";

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${day}/${month}/${year}`;
}


export const createService = (title, price, details, category) => {

  return axios.post(API_URL + 'services/new', {
    title,
    price,
    details,
    category
  }, { headers: authHeader() });
};
