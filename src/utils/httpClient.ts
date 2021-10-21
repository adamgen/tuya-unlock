import { default as axios } from 'axios';

const { HOST } = process.env;

export const httpClient = axios.create({
    baseURL: HOST,
    timeout: 5 * 1e3,
});
