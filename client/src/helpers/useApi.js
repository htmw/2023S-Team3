import axios from "axios";
import { useNavigate } from "react-router-dom";

const config = {
  baseURL: "https://example.com/api",
  headers: {
    "Content-Type": "application/json",
  },
};
const client = axios.create(config);

function useApi() {
  const navigate = useNavigate();
  const get = async (url, { params }) => {
    config.headers.token = localStorage.getItem("token");
    try {
      return await client.get(url, {
        params: params,
        headers: config.headers,
      });
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("/login");
      } else {
        throw e;
      }
    }
  };

  const post = async (url, payload) => {
    config.headers.token = localStorage.getItem("token");
    try {
      return await client.post(url, payload, { headers: config.headers });
    } catch (e) {
      if (e.response?.status === 401) {
        navigate("/login");
      } else {
        throw e;
      }
    }
  };
  return {
    get,
    post,
  };
}
export default useApi;
