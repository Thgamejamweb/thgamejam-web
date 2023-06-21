import axios from 'axios';
import { UserApi } from '../../api/api/thgamejam/user/userApi';



const customSend = async <T, R>({ method, url, data }: { method: string, url: string, data: T }): Promise<R> => {
    const response = await axios({ method, url, data });
    return response.data;
};

const fromRequest = <T = any>(data: T)=> {
    return data
}

export const userApi = new UserApi(customSend, fromRequest, fromRequest);

