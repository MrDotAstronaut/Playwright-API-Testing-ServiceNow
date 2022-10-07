import { APIRequestContext } from '@playwright/test';

export class APIUtils{

    readonly apiContext : APIRequestContext;
    readonly basePath : string;

    constructor(apiContext : APIRequestContext, basePath : string){
        this.apiContext = apiContext;
        this.basePath = basePath;
    }

    async createIncident(payload : JSON){
        const response = await this.apiContext.post(`${this.basePath}`, {
            data: payload
        });
        return response;
    }

    async getIncident(number : string){
        const response = await this.apiContext.get(`${this.basePath}`, {
            params: {
                task_effective_number: number,
            }
        });
        return response;
    }

    async modifyIncident(payload : JSON, sys_id : string){
        const response = await this.apiContext.put(`${this.basePath}/${sys_id}`, {
            data: payload
        });
        return response;
    }

    async updateIncident(payload : JSON, sys_id : string){
        const response = await this.apiContext.patch(`${this.basePath}/${sys_id}`, {
            data: payload
        });
        return response;
    }

    async deleteIncident(sys_id : string){
        const response = await this.apiContext.delete(`${this.basePath}/${sys_id}`, {
            data: { }
        });
        return response;
    }

}