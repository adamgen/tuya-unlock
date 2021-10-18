import * as crypto from 'crypto';
import { encryptStr } from './encryptStr';
import { config } from './config';
import { httpClient } from './httpClient';

export async function getToken() {
    const method = 'GET';
    const timestamp = Date.now().toString();
    const signUrl = '/v1.0/token?grant_type=1';
    const contentHash = crypto.createHash('sha256').update('').digest('hex');
    const stringToSign = [method, contentHash, '', signUrl].join('\n');
    const signStr = config.accessKey + timestamp + stringToSign;

    const headers = {
        t: timestamp,
        sign_method: 'HMAC-SHA256',
        client_id: config.accessKey,
        sign: await encryptStr(signStr, config.secretKey),
    };
    try {
        const { data: login }: any = await httpClient.get(
            '/v1.0/token?grant_type=1',
            { headers },
        );
        if (!login || !login.success) {
            throw Error(`Authorization Failed: ${login.msg}`);
        }
        const token = login.result.access_token;

        return token;
    } catch (e) {
        return;
    }
}
