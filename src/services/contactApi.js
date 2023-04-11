// Manage for all services protocols for site
import axios from 'axios';

const BASE_URL = 'http://localhost:5173/api';

export const get = async () => {
  const response = await axios.get(`${BASE_URL}/contacts`);
  return response.data;
};

export const post = async (contact) => {
  const response = await axios.post(`${BASE_URL}/contacts`, contact);
  return response.data;
};

export const put = async (contactId, contact) => {
  const response = await axios.put(`${BASE_URL}/contacts/${contactId}`, contact);
  return response.data;
};

export const del = async (contactId) => {
  const response = await axios.delete(`${BASE_URL}/contacts/${contactId}`);
  return response.data;
};