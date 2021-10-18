import * as forge from 'node-forge';

export const decrypt = (bufferToDecrypt: Buffer, key: string) => {
    const decipher = forge.cipher.createDecipher(
        'AES-ECB',
        forge.util.createBuffer(Buffer.from(key).toString('binary')),
    );
    decipher.start();
    decipher.update(
        forge.util.createBuffer(bufferToDecrypt.toString('binary')),
    );
    decipher.finish();
    return Buffer.from(decipher.output.toHex(), 'hex');
};

export const encrypt = (bufferToEncrypt: Buffer, key: Buffer) => {
    const cipher = forge.cipher.createCipher(
        'AES-ECB',
        forge.util.createBuffer(Buffer.from(key).toString('binary')),
    );
    cipher.start();
    cipher.update(forge.util.createBuffer(bufferToEncrypt.toString('binary')));
    cipher.finish();
    return Buffer.from(cipher.output.toHex(), 'hex');
};
