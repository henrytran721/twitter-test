import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL: 'https://henri-twitter-test.herokuapp.com/' || 'http://localhost:9000',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});