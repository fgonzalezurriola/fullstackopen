import axios from "axios";
const restURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  const request = axios.get(`${restURL}/all`);
  return request.then((response) => response.data);
};

const getCountry = (name) => {
  const request = axios.get(`${restURL}/name/${name}`);
  return request.then((response) => response.data);
};

export default {
  getAllCountries: getAllCountries,
  getCountry: getCountry,
};
