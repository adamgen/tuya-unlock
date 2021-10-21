import { tuyaRequest } from '../utils/tuyaRequest';

export const allocateUserPassword = (deviceId: string, userId: string) => {
    return tuyaRequest({
        url: `/v1.0/devices/${deviceId}/device-lock/users/${userId}/allocate`,
        method: 'POST',
        body: {
            nick_name: 'adam',
            sex: 1,
        },
    });
};
