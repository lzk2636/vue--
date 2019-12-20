import axios from 'axios'
import { getToken } from '../utils/token'
// You can create a new instance of axios with a custom config.
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    withCredentials: true,

});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers.token=getToken()
    // window.console.log(config)

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default instance;