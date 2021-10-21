import { tuyaRequest } from '../utils/tuyaRequest';

export const getTempPasswords = (deviceId: string) => {
    return tuyaRequest({
        url: `/v1.0/devices/${deviceId}/door-lock/temp-passwords`,
        method: 'GET',
        body: {},
    });
};
