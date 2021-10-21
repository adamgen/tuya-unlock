import { tuyaRequest } from '../utils/tuyaRequest';

export const getPasswordTicket = (deviceId: string) => {
    return tuyaRequest({
        url: `/v1.0/devices/${deviceId}/door-lock/password-ticket`,
        method: 'POST',
    });
};
