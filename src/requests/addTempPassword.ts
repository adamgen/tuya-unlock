import { tuyaRequest } from '../utils/tuyaRequest';

interface AddTempPasswordProps {
    name: string;
    password: string;
    ticketId: string;
    deviceId: string;
}

export const addTempPassword = async ({
    password,
    ticketId,
    name,
    deviceId,
}: AddTempPasswordProps) => {
    const effective_time = parseInt(
        (new Date().getTime() / 1000).toString().split('.')[0],
    );
    const invalid_time = effective_time + 60 * 60 * 24;

    return tuyaRequest({
        url: `/v1.0/devices/${deviceId}/door-lock/temp-password`,
        method: 'POST',
        body: {
            name,
            password,
            effective_time,
            invalid_time,
            password_type: 'ticket',
            ticket_id: ticketId,
        },
    });
};
