import axios from "axios";
import {UserApi} from "@api/api/thgamejam/user/userApi.ts";
import {CompetitionApi} from "@api/api/thgamejam/competition/competitionApi.ts";
import {FileApi} from "@api/api/thgamejam/file/fileApi.ts";
import {TeamApi} from "@api/api/thgamejam/team/teamApi.ts";
import {WorksApi} from "@api/api/thgamejam/works/worksApi.ts";


const customSend = async <T, R>({ method, url, data }: { method: string, url: string, data: T }): Promise<R> => {
    const response = await axios({ method, url, data });
    return response.data;
};
const fromResponse = <T = any>(data: T) => {
    return data
}

const fromRequest = <T = any>(data: T) => {
    return JSON.stringify(data);
}

export const userApi = new UserApi(customSend, fromRequest, fromResponse);

export const competitionApi = new CompetitionApi(customSend, fromRequest, fromResponse);

export const fileApi = new FileApi(customSend, fromRequest, fromResponse);

export const teamApi = new TeamApi(customSend, fromRequest, fromResponse);

export const workApi = new WorksApi(customSend, fromRequest, fromResponse);
