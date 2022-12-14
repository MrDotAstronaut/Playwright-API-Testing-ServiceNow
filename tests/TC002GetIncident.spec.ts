import { test, expect } from '@playwright/test';
import { payload } from '../utils/payload/payloads';
import { path } from '../utils/path/paths';
import { APIUtils } from '../utils/api/APIUtils';

let apiUtils;

let sys_id: string;
let number: string;

test.describe('Get Incident', () => {

    test.beforeAll(async ({ request }) => {
        apiUtils = new APIUtils(request, path.incident);
    });

    test.beforeEach(async () => {
        const response = await apiUtils.createIncident(payload.createPayload);
        await expect(response.status()).toBe(201);
        await expect(response.ok()).toBeTruthy();
        console.log(await response.json());
        const receivedRes = await response.json();
        sys_id = receivedRes.result.sys_id;
        number = receivedRes.result.number;
    })

    test('Get Incident Successful', async () => {
        const response = await apiUtils.getIncident(number);
        console.log(await response.json());
        await expect(response.status()).toBe(200);
        await expect(response.ok()).toBeTruthy();
        const receivedRes = await response.json();
        const expectedRes = {
            result: [
                payload.createPayload
            ]
        }
        expect(receivedRes).toMatchObject(expectedRes);
    });

    test.afterEach(async () => {
        if (sys_id != null) {
            const response = await apiUtils.deleteIncident(sys_id);
            await expect(response.status()).toBe(204);
            await expect(response.ok()).toBeTruthy();
        }
    });

})