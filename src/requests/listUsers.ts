import { tuyaRequest } from '../tuyaRequest';

export const listUsers = async (deviceId: string) => {
    return await tuyaRequest({
        url: `/v1.0/devices/${deviceId}/users`,
        method: 'GET',
        body: {},
    });
};
