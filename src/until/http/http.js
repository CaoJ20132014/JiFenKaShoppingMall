import axios from 'axios';
import qs from 'qs';
import { MessageBox } from 'element-ui';
import Route from '@/router/index';

axios.defaults.timeout = 10000;
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = '/api';
} else {
	axios.defaults.baseURL = 'https://a.91jfk.com';
}
//http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return config;
    },
    error => {
        return Promise.reject(err);
    }
);
//http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error.response.data);
    }
)
export function fetch(url, params, method){
    if (method == 'GET' || method == 'get') {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(response => {
                if (typeof response != 'undefined') {
                    resolve(response.data);
                }
            }).catch(err => {
                reject(err)
            });
        });
    } else if (method == 'POST' || method == 'post'){
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params)).then(response => {
                if (typeof response != 'undefined') {
                    resolve(response.data);
                }
            }, err => {
                reject(err)
            });
        });
    }
}