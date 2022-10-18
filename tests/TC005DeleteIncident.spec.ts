import { test, expect } from '@playwright/test';
import { payload } from '../utils/payload/payloads';
import { path } from '../utils/path/paths';
import { APIUtils } from '../utils/api/APIUtils';

let apiContext;
let apiUtils;

let sys_id: string;

test.describe('Create Incident', () => {

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

    test('Incident Creation Successful', async () => {
        if (sys_id != null) {
            const response = await apiUtils.deleteIncident(sys_id);
            await expect(response.status()).toBe(204);
            await expect(response.ok()).toBeTruthy();
        }
    });

})