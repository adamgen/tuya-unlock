import { getToken } from './getToken';
import { getRequestSign } from './getRequestSign';
import { httpClient } from './httpClient';

interface TuyaRequestProps {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    params?: { [k: string]: any };
    body?: any;
}

export const tuyaRequest = async ({
    url,
    method,
    params,
    body = {},
}: TuyaRequestProps) => {
    const token = await getToken();

    const reqHeaders: { [k: string]: string } = await getRequestSign(
        token,
        url,
        method,
        {},
        params,
        body,
    );

    const { data }: any = await httpClient.request({
        method,
        data: body,
        params,
        headers: reqHeaders,
        url: reqHeaders.path,
    });
    if (!data || !data.success) {
        throw Error(`Request highway Failed: ${data.msg}`);
    }

    return data;
};
