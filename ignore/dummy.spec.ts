import { test, expect } from '@playwright/test';
import { incidentData } from '../utils/testdata';
import { payload } from '../utils/payload/payloads';

let sys_id : string;

for (const data of incidentData) {
    test.beforeEach(async ({request}) => {
        const response = await request.post('', {
            data : payload.createPayload
        })
        await expect(response.status()).toBe(201);
        await expect(response.ok()).toBeTruthy();
        console.log(await response.json());
        const res = await response.json();
        sys_id = res.result.sys_id;
    })

    test.skip('Incident Modify Successful', async ({request, baseURL}) => {
        const response = await request.put(`${baseURL}/${sys_id}`,{
            data : payload.modifyPayload
        })
        await expect(response.status()).toBe(200);
        await expect(response.ok()).toBeTruthy();
        console.log(await response.json());
        const receivedRes = await response.json();
        const expectedRes = {
            result : payload.modifyPayload
        }
        expect(receivedRes).toMatchObject(expectedRes);
    });
}