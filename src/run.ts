import { decrypt, encrypt } from './utils/paswordCrypto';
import { getPasswordTicket } from './requests/getPasswordTicket';
import { addTempPassword } from './requests/addTempPassword';

const { SECRET_KEY } = process.env as { [key: string]: string };

export const run = async (deviceId: string) => {
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
