import { tuyaRequest } from '../tuyaRequest';

export const addUser = async (deviceId: string) => {
    return await tuyaRequest({
        url: `/v1.0/devices/${deviceId}/user`,
        method: 'POST',
        body: {
            nick_name: 'adam',
            sex: 1,
        },
    });
};
