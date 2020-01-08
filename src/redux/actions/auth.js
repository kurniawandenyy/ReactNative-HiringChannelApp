import axios from 'axios';

export const Register = (url, data) => ({
  type: 'REGISTER',
  payload: axios.post(url, data),
});

export const Login = (url, data) => ({
  type: 'LOGIN',
  payload: axios.post(url, data),
});

export const getSession = url => ({
  type: 'GET_SESSION',
  payload: axios.get(url),
});
