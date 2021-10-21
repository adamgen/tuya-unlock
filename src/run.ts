import { tuyaRequest } from './tuyaRequest';
import { decrypt, encrypt } from './utils';

const { SECRET_KEY } = process.env;

const listUsers = async (deviceId: string) => {
    return await tuyaRequest({
        url: `/v1.0/devices/${deviceId}/users`,
        method: 'GET',
        body: {},
    });
};

const addUser = async (deviceId: string) => {
    return await tuyaRequest({
        url: `/v1.0/devices/${deviceId}/user`,
        method: 'POST',
        body: {
            nick_name: 'adam',
            sex: 1,
        },
    });
};

const allocateUserPassword = (deviceId: string, userId: string) => {
    return tuyaRequest({
        url: `/v1.0/devices/${deviceId}/device-lock/users/${userId}/allocate`,
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
    deviceId: string;
}

const addTempPassword = async ({
    password,
    ticketId,
    name,
    deviceId,
}: AddTempPasswordProps) => {
    const effective_time = parseInt(
        (new Date().getTime() / 1000).toString().split('.')[0],
    );
    const invalid_time = effective_time + 60 * 60 * 24;

    console.log({ effective_time, invalid_time });
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

const getTempPasswords = (deviceId: string) => {
    return tuyaRequest({
        url: `/v1.0/devices/${deviceId}/door-lock/temp-passwords`,
        method: 'GET',
        body: {},
    });
};

const getPasswordTicket = (deviceId: string) => {
    return tuyaRequest({
        url: `/v1.0/devices/${deviceId}/door-lock/password-ticket`,
        method: 'POST',
    });
};

export const run = async (deviceId: string) => {
    // const data = await getTempPasswords();

    // const data = await listUsers();

    // const data = await addUser();

    // const data = await allocateUserPassword('000000amdc');

    const ticketData = await getPasswordTicket(deviceId);
    const decryptedKey = decrypt(
        Buffer.from(ticketData.result.ticket_key, 'hex'),
        SECRET_KEY,
    );
    const encryptedPassword = encrypt(
        Buffer.from('7654321', 'ascii'),
        decryptedKey,
    );
    const encryptedPasswordAsHex = encryptedPassword.toString('hex');
    const data = await addTempPassword({
        deviceId,
        name: 'Adams api test 2',
        password: encryptedPasswordAsHex,
        ticketId: ticketData.result.ticket_id,
    });
    console.log(data);
};

run('bf80786606d50303aeum9g');
