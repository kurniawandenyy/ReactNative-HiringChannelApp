import axios from 'axios';

export const fetchCompanies = url => ({
  type: 'FETCH_COMPANIES',
  payload: axios.get(url),
});

export const getCompany = url => ({
  type: 'GET_COMPANY',
  payload: axios.get(url),
});

export const deleteCompany = (url, config) => ({
  type: 'DELETE_COMPANY',
  payload: axios.delete(url, config),
});

export const updateCompany = (url, formData, config) => ({
  type: 'UPDATE_COMPANY',
  payload: axios.put(url, formData, config),
});
