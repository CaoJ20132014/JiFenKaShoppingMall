import {fetch} from './http';
import api from '../api/api';

/*
* 账号密码登录
*/
export const accountLogin = data => fetch(api.accountLogin, data,'POST');
