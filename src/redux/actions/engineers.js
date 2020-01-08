import axios from 'axios';

export const fetchEngineers = url => ({
  type: 'FETCH_ENGINEERS',
  payload: axios.get(url),
});

export const getEngineer = url => ({
  type: 'GET_ENGINEER',
  payload: axios.get(url),
});

export const deleteEngineer = (url, config) => ({
  type: 'DELETE_ENGINEER',
  payload: axios.delete(url, config),
});

export const updateEngineer = (url, formData, config) => ({
  type: 'UPDATE_ENGINEER',
  payload: axios.put(url, formData, config),
});
