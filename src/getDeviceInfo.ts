import { httpClient } from './httpClient';
import { getRequestSign } from './getRequestSign';

export async function getDeviceInfo(deviceId: string, token: string) {
    const query = {};
    const method = 'GET';

    const url = `/v1.0/devices/${deviceId}/door-lock/temp-passwords`;
    const reqHeaders: { [k: string]: string } = await getRequestSign(
        token,
        url,
        method,
        {},
        query,
    );

    const { data }: any = await httpClient.request({
        method,
        data: {},
        params: {},
        headers: reqHeaders,
        url: reqHeaders.path,
    });
    if (!data || !data.success) {
        throw Error(`Request highway Failed: ${data.msg}`);
    }

    return data;
}
