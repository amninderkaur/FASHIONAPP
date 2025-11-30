import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/authenticate`, { email, password });
  return response.data;
};
