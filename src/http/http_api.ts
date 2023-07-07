import axios from "axios";
import { UserApi } from "@api/api/thgamejam/user/userApi.ts";
import { CompetitionApi } from "@api/api/thgamejam/competition/competitionApi.ts";
import { FileApi } from "@api/api/thgamejam/file/fileApi.ts";
import { TeamApi } from "@api/api/thgamejam/team/teamApi.ts";
import { WorksApi } from "@api/api/thgamejam/works/worksApi.ts";

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error.response.status);
        // 如果响应失败，检查状态码是否为 302 (重定向)
        if (error.response && error.response.status === 401) {
            // 跳转到登录页面
            //window.location.assign("/login");
        }
        // 如果是其他错误，则抛出错误，以便其他地方处理
        return Promise.reject(error);
    }
);

const customSend = async <T, R>({
    method,
    url,
    data,
}: {
    method: string;
    url: string;
    data: T;
}): Promise<R> => {
    const response = await axios({ method, url, data });
    return response.data;
};
const fromResponse = <T = any>(data: T) => {
    return data;
};

const fromRequest = <T = any>(data: T) => {
    return JSON.stringify(data);
};

export const userApi = new UserApi(customSend, fromRequest, fromResponse);

export const competitionApi = new CompetitionApi(
    customSend,
    fromRequest,
    fromResponse
);

export const fileApi = new FileApi(customSend, fromRequest, fromResponse);

export const teamApi = new TeamApi(customSend, fromRequest, fromResponse);

export const workApi = new WorksApi(customSend, fromRequest, fromResponse);

// 读取文件并计算哈希值
export async function calculateFileHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const fileHash = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    return fileHash;
}
