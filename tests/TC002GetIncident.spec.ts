import { test, expect, request } from '@playwright/test';
import { payload } from '../utils/payload/payloads';
import { path } from '../utils/path/paths';
import { APIUtils } from '../utils/APIUtils';

let apiContext
let apiUtils;

let res;
let sys_id: string;
let number: string;

test.describe('Get Incident', () => {

    test.beforeAll(async ({ baseURL, extraHTTPHeaders }) => {
        const basePath = '/api/now/table/incident';
        apiContext = await request.newContext({ baseURL, extraHTTPHeaders });
        apiUtils = new APIUtils(apiContext, path.incident);
    })

    test.beforeEach(async () => {
        const response = await apiUtils.createIncident(payload.createPayload);
        await expect(response.status()).toBe(201);
        await expect(response.ok()).toBeTruthy();
        console.log(await response.json());
        res = await response.json();
        sys_id = res.result.sys_id;
        number = res.result.number;
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

    test.afterAll(async () => {
        apiContext.dispose();
    });

})