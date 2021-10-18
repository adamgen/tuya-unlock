import * as qs from 'qs';
import * as crypto from 'crypto';
import { default as axios } from 'axios';
import { encryptStr } from './encryptStr';
import { getToken } from './getToken';
import { config } from './config';

export const httpClient = axios.create({
    baseURL: config.host,
    timeout: 5 * 1e3,
});
