import { test, expect, request } from '@playwright/test';
import { payload } from '../utils/payload/payloads';
import { APIUtils } from '../utils/APIUtils';

let apiContext;
let apiUtils;

let sys_id: string;

test.describe('Create Incident', () => {

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

    test('Incident Creation Successful', async () => {
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