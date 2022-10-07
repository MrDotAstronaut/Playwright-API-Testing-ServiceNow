import { test, expect, request } from '@playwright/test';
import { payload } from '../utils/payload/payloads';
import { APIUtils } from '../utils/APIUtils';

let apiContext;
let apiUtils;

let sys_id: string;

test.describe('Update Incident', () => {

    test.beforeAll(async ({ baseURL, extraHTTPHeaders }) => {
        const basePath = '/api/now/table/incident';
        apiContext = await request.newContext({ baseURL, extraHTTPHeaders });
        apiUtils = new APIUtils(apiContext, basePath);
    })

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

    test.afterAll(async () => {
        apiContext.dispose();
    });

})