import { tuyaRequest } from './tuyaRequest';
import { config } from './config';
import { decrypt, encrypt } from './utils';

const listUsers = async () => {
    return await tuyaRequest({
        url: `/v1.0/devices/${config.deviceId}/users`,
        method: 'GET',
        body: {},
    });
};

const addUser = async () => {
    return await tuyaRequest({
        url: `/v1.0/devices/${config.deviceId}/user`,
        method: 'POST',
        body: {
            nick_name: 'adam',
            sex: 1,
        },
    });
};

const allocateUserPassword = (userId: string) => {
    return tuyaRequest({
        url: `/v1.0/devices/${config.deviceId}/device-lock/users/${userId}/allocate`,
        method: 'POST',
        body: {
            nick_name: 'adam',
            sex: 1,
        },
    });
};

interface AddTempPasswordProps {
    name: string;
    password: string;
    ticketId: string;
}

const addTempPassword = async ({
    password,
    ticketId,
    name,
}: AddTempPasswordProps) => {
    const now = (new Date().getTime() / 1000).toString().split('.')[0];

    return tuyaRequest({
        url: `/v1.0/devices/${config.deviceId}/door-lock/temp-password`,
        method: 'POST',
        body: {
            name,
            password,
            effective_time: now,
            invalid_time: now + 60 * 60 * 24,
            password_type: 'ticket',
            ticket_id: ticketId,
        },
    });
};

const getTempPasswords = () => {
    return tuyaRequest({
        url: `/v1.0/devices/${config.deviceId}/door-lock/temp-passwords`,
        method: 'GET',
        body: {},
    });
};

const getPasswordTicket = () => {
    return tuyaRequest({
        url: `/v1.0/devices/${config.deviceId}/door-lock/password-ticket`,
        method: 'POST',
    });
};

export const run = async () => {
    // const data = await getTempPasswords();

    // const data = await listUsers();

    // const data = await addUser();

    // const data = await allocateUserPassword('000000amdc');

    const ticketData = await getPasswordTicket();
    const decryptedKey = decrypt(
        Buffer.from(ticketData.result.ticket_key, 'hex'),
        config.secretKey,
    );
    const encryptedPassword = encrypt(
        Buffer.from('7654321', 'ascii'),
        decryptedKey,
    );
    const encryptedPasswordAsHex = encryptedPassword.toString('hex');
    const data = await addTempPassword({
        name: 'Adams api test 1',
        password: encryptedPasswordAsHex,
        ticketId: ticketData.result.ticket_id,
    });
    console.log(data);
};

run();
