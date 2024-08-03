import axios from "axios";

const url = "http://localhost:3000/";

const axiosAPI = axios.create({
  baseURL: url,
});

const apiRequest = async (method, url, request) => {
  return axiosAPI({
    method,
    url,
    data: request,
  })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const get = (url, request) => apiRequest("get", url, request);
const deleteRequest = (url, request) => apiRequest("delete", url, request);
const post = (url, request) => apiRequest("post", url, request);
const put = (url, request) => apiRequest("put", url, request);

const API = {
  get,
  deleteRequest,
  post,
  put,
};


export default API;
