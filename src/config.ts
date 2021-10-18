export const config = {
    /* Service address */
    host: process.env.HOST || '',
    /* Access Id */
    accessKey: process.env.ACCESS_KEY || '',
    /* Access Secret */
    secretKey: process.env.SECRET_KEY || '',
    /* Interface example device_id */
    deviceId: process.env.DEVICE_ID || '',
};

console.log(process.env.SECRET_KEY);
