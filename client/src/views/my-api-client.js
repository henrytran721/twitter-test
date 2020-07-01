import axios from 'axios';

export const MyApiClient = axios.create({
  baseURL:'http://henri-twitter-test.herokuapp.com',
  // baseURL: "http://localhost:9000",
  timeout: 300000,
  headers: {'X-Custom-Header': 'foobar'}
});