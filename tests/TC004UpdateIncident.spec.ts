import { test, expect } from '@playwright/test';
import { payload } from '../utils/payload/payloads';
import { path } from '../utils/path/paths';
import { APIUtils } from '../utils/api/APIUtils';

let apiContext;
let apiUtils;

let sys_id: string;

test.describe('Update Incident', () => {

    test.beforeAll(async ({ request }) => {
        apiUtils = new APIUtils(request, path.incident);
    });

    test.beforeEach(async () => {
        const response = await apiUtils.createIncident(payload.createPayload);
        await expect(response.status()).toBe(201);
        await expect(response.ok()).toBeTruthy();
        console.log(await response.json());
        const res = await response.json();
        sys_id = res.result.sys_id;
    })

    test('Incident Update Successful', async () => {
        const response = await apiUtils.updateIncident(payload.updatePayload, sys_id);
        await expect(response.status()).toBe(200);
        await expect(response.ok()).toBeTruthy();
        console.log(await response.json());
        const actualRes = await response.json();
        const expectedRes = {
            result: payload.updatePayload
        }
        expect(actualRes).toMatchObject(expectedRes);
    });

    test.afterEach(async () => {
        if (sys_id != null) {
            const response = await apiUtils.deleteIncident(sys_id);
            await expect(response.status()).toBe(204);
            await expect(response.ok()).toBeTruthy();
        }
    });

})