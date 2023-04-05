import axios from 'axios'
const config = {
    baseURL: "https://example.com/api",
    headers: {
        "Content-Type": "application/json",
    },
};

const client = axios.create(config);

const get = (url) => {
  return client.get(url);
};

const post = (url, payload) => {
  return client.post(url, payload);
};

export default {
  get,
  post,
};