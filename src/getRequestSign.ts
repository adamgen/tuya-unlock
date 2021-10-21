import * as qs from 'qs';
import * as crypto from 'crypto';
import { encryptStr } from './encryptStr';

const {
    ACCESS_KEY,
    SECRET_KEY,
} = process.env;

export async function getRequestSign(
    token: string,
    path: string,
    method: string,
    headers: { [k: string]: string } = {},
    query: { [k: string]: any } = {},
    body: { [k: string]: any } = {},
) {
    const t = Date.now().toString();
    const [uri, pathQuery] = path.split('?');
    const queryMerged = Object.assign(query, qs.parse(pathQuery));
    const sortedQuery: { [k: string]: string } = {};
    Object.keys(queryMerged)
        .sort()
        .forEach((i) => (sortedQuery[i] = query[i]));

    const querystring = decodeURIComponent(qs.stringify(sortedQuery));
    const url = querystring ? `${uri}?${querystring}` : uri;
    const contentHash = crypto
        .createHash('sha256')
        .update(JSON.stringify(body))
        .digest('hex');
    const stringToSign = [method, contentHash, '', url].join('\n');
    const signStr = ACCESS_KEY + token + t + stringToSign;
    return {
        t,
        path: url,
        client_id: ACCESS_KEY,
        sign: await encryptStr(signStr, SECRET_KEY),
        sign_method: 'HMAC-SHA256',
        access_token: token,
    };
}
